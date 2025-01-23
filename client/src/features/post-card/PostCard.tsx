import { useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';

import { PostModel } from '@domain/posts/models/PostModel';
import { SettingsModel } from '@domain/settings/models/SettingsModel';

import { DATE_FORMAT } from '@utils/date';

import classes from './PostCard.module.scss';

type TProps = {
  item: PostModel;
  settings: SettingsModel;
  listLayout: string;
  username?: string;
}

export default function PostCard(props: TProps) {
  const { item, settings, username, listLayout } = props

  const currentTemplate = settings.template;

  const [hovered, setHovered] = useState<boolean>(false);

  const toggleHover = (hovered: boolean) => {
    setHovered(hovered);
  }

  const getDate = () => {
    const diffInDays = Math.round(dayjs().diff(dayjs(item.date), 'day'));

    if (diffInDays < 7) {
      if (diffInDays === 0) {
        return '1 день назад';
      }

      return dayjs().to(dayjs(item.date));
    }

    return dayjs(item.date).format(DATE_FORMAT.ISO_DATE)
  }

  return (
    <div
      className={clsx(classes.card, { [classes.hover]: currentTemplate === 'hover', [classes.masonry]: listLayout === 'masonry' })}
      onMouseEnter={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <div className={classes.card_bg} />
      <span>📝: {item.caption}</span>
      <span>❤️: {item.likes}</span>
      <span>✍️: {item.comments}</span>
      <span>📅: {getDate()}</span>
      {username && <span>👤: {username}</span>}
      {currentTemplate === 'hover' && (
        <a
          className={clsx(classes.link, { [classes.hovered]: hovered })}
          href={item.permalink}
          target="_blank"
          rel="nofollow noreferrer"
        >
          🔗: {item.permalink}
        </a>
      )}
    </div>
  )
}