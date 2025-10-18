import React from 'react';
import clsx from 'clsx'; // clsx helps manage conditional className names in a clean and concise manner.
import Link from '@docusaurus/Link';

const Card = ({
  className, // Custom classes for the container card
  style, // Custom styles for the container card
  children, // Content to be included within the card
  shadow, // Used to add shadow under your card. Expected values are: low (lw), medium (md), tall (tl)
  href, // Link URL for the card
  title, // Title for the card header
  icon, // Icon for the card header
}) => {
  const cardShadow = shadow ? `item shadow--${shadow}` : '';
  
  const Header = (title || icon) ? (
    <div className="card__header">
      {icon && <span className={`icon icon-${icon}`} aria-hidden="true"></span>}
      {title && <h3 className="card__title">{title}</h3>}
    </div>
  ) : null;

  if (href) {
    return (
      <Link to={href} className={clsx('card', className, cardShadow)} style={style} aria-label={title}>
        {Header}
        {children}
      </Link>
    );
  }

  return (
    <div className={clsx('card', className, cardShadow)} style={style}>
      {Header}
      {children}
    </div>
  );
};

export default Card;