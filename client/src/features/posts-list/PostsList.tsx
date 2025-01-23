import { useContext, useEffect, useState } from 'react';

import { FetchHttpClientImpl } from '@data/network/http/FetchHttpClientImpl';
import { PostsDatasourceImpl } from '@data/posts/datasources/PostsDatasourceImpl';
import { UsersDatasourceImpl } from '@data/users/datasources/UsersDatasourceImpl';
import { IUsersDatasource } from '@domain/users/datasources/IUsersDatasource';
import { IPostsDatasource } from '@domain/posts/datasources/IPostsDatasource';

import PostCard from '@features/post-card/PostCard';
import Navigation from '@features/posts-list/ui/Navigation/Navigation';

import { MainContext } from '@ui/layouts/main/Context';
import Loader from '@ui/kit/loader/Loader';

import { createDatasource } from '@utils/datasource';

import classes from './PostsList.module.scss';

const apiClient = new FetchHttpClientImpl();

const postsDatasource = new PostsDatasourceImpl(apiClient);
const postsData = createDatasource<IPostsDatasource>(postsDatasource);

const usersDatasource = new UsersDatasourceImpl(apiClient);
const usersData = createDatasource<IUsersDatasource>(usersDatasource);

export default function PostsList() {
  const settings = useContext(MainContext);

  const [page, setPage] = useState<number>(1);

  const { data: posts, isLoading: isPostsLoading } = postsData.getPosts().useQuery(['posts']);
  const { data: users, isLoading: isUsersLoading } = usersData.getUsers().useQuery(['users']);

  const currentLayout = settings.layout.current;
  const navigationType = settings.navigation;
  const layoutColumns = settings.layout.params[currentLayout].columns;
  const layoutRows = settings.layout.params[currentLayout].rows;

  const pageSize = layoutColumns * layoutRows;
  const totalPages = Math.ceil(Number(posts?.length) / pageSize);

  useEffect(() => {
    setPage(1);
  }, [settings])

  const getLimitedData = () => {
    switch (navigationType) {
      case 'pagination':
        return posts?.slice((page - 1) * pageSize, page * pageSize);
      case 'load-more':
        return posts?.slice(0, page * pageSize)
      default:
        return posts?.slice((page - 1) * pageSize, page * pageSize);
    }
  }

  const getCurrentGridStyles = () => {
    switch (currentLayout) {
      case 'grid':
        return {
          gridTemplateColumns: `repeat(${layoutColumns}, 1fr)`,
          gridTemplateRows: `repeat(${layoutRows}, 1fr)`,
          display: 'grid'
        }
      case 'masonry':
        return {
          columnCount: layoutColumns,
          columnGap: '30px',
          display: 'inline-block'
        }
      default:
        return {
          gridTemplateColumns: `repeat(${layoutColumns}, 1fr)`,
          gridTemplateRows: `repeat(${layoutRows}, 1fr)`,
          display: 'grid'
        }
    }
  }

  return (
    (isPostsLoading || isUsersLoading) ? <Loader/> :
      <>
        <div
          className={classes.posts_list}
          style={getCurrentGridStyles()}
        >
          {getLimitedData()?.map((item) => {
            const user = users?.filter((user) => item.userId === user.id)[0];

            return (
              <PostCard
                key={item.id}
                item={item}
                username={user?.username}
                settings={settings}
                listLayout={currentLayout}
              />
            );
          })}
        </div>
        {!!getLimitedData()?.length && (
          <Navigation
            page={page}
            onSetPage={setPage}
            totalPages={totalPages}
            navigationType={navigationType}
          />
        )}
      </>
  );
}