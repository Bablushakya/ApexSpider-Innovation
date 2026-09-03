import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

/**
 * Breadcrumb — renders a semantic breadcrumb navigation trail.
 * @param {Array<{label: string, href?: string}>} items
 */
export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li
              key={item.label}
              className="breadcrumb-item"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page" itemProp="name">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link to={item.href} className="breadcrumb-link" itemProp="item">
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <span className="breadcrumb-sep" aria-hidden="true">›</span>
                </>
              )}
              <meta itemProp="position" content={String(idx + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
