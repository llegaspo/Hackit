import React from 'react';

export type NotificationType = {
  id: string;
  authorName: string;
  authorAvatarColor: string;
  action: 'commented on your post' | 'liked your post';
  postTitle: string;
  timeAgo: string;
  isRead: boolean;
};

interface NotificationsMenuProps {
  notifications: NotificationType[];
  onNotificationClick: (notificationId: string) => void;
  onClearAll?: () => void;
}

const NotificationsMenu: React.FC<NotificationsMenuProps> = ({ 
  notifications, 
  onNotificationClick,
  onClearAll 
}) => {
  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    width: '380px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '1.25rem',
    boxShadow: '0 1rem 3rem rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    zIndex: 20,
    marginTop: '0.5rem',
    overflow: 'hidden',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
    animation: 'slideDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const headerStyle: React.CSSProperties = {
    padding: '1.25rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgba(247, 197, 197, 0.1), rgba(233, 30, 99, 0.05))',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  };

  const unreadCountStyle: React.CSSProperties = {
    color: '#E91E63',
    marginLeft: '0.5rem',
    background: 'rgba(233, 30, 99, 0.1)',
    borderRadius: '1rem',
    padding: '0.125rem 0.5rem',
    fontSize: '0.75rem',
    fontWeight: 600,
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxHeight: '400px',
    overflowY: 'auto',
  };

  const clearAllButtonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #F7C5C5, #E8A8A8)',
    border: 'none',
    color: '#444',
    fontSize: '0.75rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderRadius: '1rem',
    padding: '0.375rem 0.75rem',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-1rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(0.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .notification-item {
          animation: fadeInUp 0.3s ease-out;
          animation-fill-mode: both;
        }

        .notification-item:nth-child(1) { animation-delay: 0.05s; }
        .notification-item:nth-child(2) { animation-delay: 0.1s; }
        .notification-item:nth-child(3) { animation-delay: 0.15s; }
        .notification-item:nth-child(4) { animation-delay: 0.2s; }
        .notification-item:nth-child(5) { animation-delay: 0.25s; }

        .notification-item:hover {
          background: linear-gradient(135deg, rgba(247, 197, 197, 0.15), rgba(233, 30, 99, 0.08)) !important;
          transform: translateX(0.25rem) !important;
          box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1) !important;
        }

        .notification-item:hover .notification-avatar {
          transform: scale(1.1) !important;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }

        .notification-item:hover .notification-text {
          color: #222 !important;
        }

        .notification-item:hover .notification-time {
          color: #555 !important;
        }

        .notification-item:hover .unread-dot {
          transform: scale(1.2) !important;
          box-shadow: 0 0 0.5rem rgba(233, 30, 99, 0.3) !important;
        }

        .notification-item:active {
          transform: translateX(0.125rem) scale(0.98) !important;
        }

        .clear-all-button:hover {
          background: linear-gradient(135deg, #E8A8A8, #D18B8B) !important;
          transform: translateY(-0.125rem) scale(1.05) !important;
          box-shadow: 0 0.375rem 1rem rgba(247, 197, 197, 0.4) !important;
        }

        .clear-all-button:active {
          transform: translateY(0) scale(0.95) !important;
        }

        .notifications-menu {
          /* Default styles are inline */
        }
        
        @media (max-width: 480px) {
          .notifications-menu {
            width: 350px !important;
            max-width: 95vw !important;
            right: 0 !important;
            left: auto !important;
          }
        }
      `}</style>
      <div style={menuStyle} className="notifications-menu">
        <header style={headerStyle}>
          <h3 style={titleStyle}>
            Notifications
            <span style={unreadCountStyle}>
              {notifications.filter(n => !n.isRead).length}
            </span>
          </h3>
          {onClearAll && (
            <button 
              style={clearAllButtonStyle}
              className="clear-all-button"
              onClick={onClearAll}
            >
              Mark all as read
            </button>
          )}
        </header>
        <ul style={listStyle}>
          {notifications.map((notification) => (
            <NotificationItem 
              key={notification.id}
              notification={notification}
              onClick={() => onNotificationClick(notification.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

interface NotificationItemProps {
  notification: NotificationType;
  onClick: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClick }) => {
  const { authorName, authorAvatarColor, action, postTitle, timeAgo, isRead } = notification;

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    position: 'relative',
    overflow: 'hidden',
  };

  const avatarStyle: React.CSSProperties = {
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: '50%',
    backgroundColor: authorAvatarColor,
    flexShrink: 0,
    marginRight: '1rem',
    boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
    minWidth: 0,
  };

  const textStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: 1.5,
    margin: 0,
    transition: 'all 0.3s ease',
  };
  
  const postTitleStyle: React.CSSProperties = {
    fontWeight: 500,
    color: '#E91E63',
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#6B7280',
    marginTop: '0.25rem',
    transition: 'all 0.3s ease',
  };
  
  const unreadDotStyle: React.CSSProperties = {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: '#E91E63',
    flexShrink: 0,
    marginLeft: '1rem',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  return (
    <li 
      style={{
        ...itemStyle,
        opacity: isRead ? 0.7 : 1,
        background: isRead ? 'transparent' : 'rgba(233, 30, 99, 0.02)',
      }} 
      onClick={onClick} 
      className="notification-item"
    >
      <div style={avatarStyle} className="notification-avatar"></div>
      <div style={contentStyle}>
        <p style={textStyle} className="notification-text">
          <span style={{fontWeight: 600}}>{authorName}</span> {action} <span style={postTitleStyle}>&ldquo;{postTitle}&rdquo;</span>
        </p>
        <p style={timeStyle} className="notification-time">{timeAgo}</p>
      </div>
      {!isRead && <div style={unreadDotStyle} className="unread-dot"></div>}
    </li>
  );
};

export default NotificationsMenu; 