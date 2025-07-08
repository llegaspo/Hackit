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
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 0.5rem 2rem rgba(0, 0, 0, 0.15)',
    border: '1px solid #E5E7EB',
    zIndex: 20,
    marginTop: '0.5rem',
    overflow: 'hidden',
    fontFamily: "'Britti Sans Trial', Inter, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#111827',
  };

  const unreadCountStyle: React.CSSProperties = {
    color: '#E91E63',
    marginLeft: '0.5rem',
  };

  const listStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    maxHeight: '400px',
    overflowY: 'auto',
  };

  return (
    <>
      <style jsx>{`
        .notification-item:hover {
          background-color: #F9FAFB !important;
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
              ({notifications.filter(n => !n.isRead).length})
            </span>
          </h3>
          {onClearAll && (
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: '#6B7280',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
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
    padding: '1rem',
    borderBottom: '1px solid #E5E7EB',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const avatarStyle: React.CSSProperties = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: authorAvatarColor,
    flexShrink: 0,
    marginRight: '1rem',
  };

  const contentStyle: React.CSSProperties = {
    flexGrow: 1,
  };

  const textStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#374151',
    lineHeight: 1.5,
  };
  
  const postTitleStyle: React.CSSProperties = {
    fontWeight: 500, // Make post title slightly bolder than action text
  };

  const timeStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: '#6B7280',
    marginTop: '0.25rem',
  };
  
  const unreadDotStyle: React.CSSProperties = {
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: '#E91E63',
    flexShrink: 0,
    marginLeft: '1rem',
  };

  return (
    <li style={itemStyle} onClick={onClick} className="notification-item">
      <div style={avatarStyle}></div>
      <div style={contentStyle}>
        <p style={textStyle}>
          <span style={{fontWeight: 600}}>{authorName}</span> {action} <span style={postTitleStyle}>“{postTitle}”</span>
        </p>
        <p style={timeStyle}>{timeAgo}</p>
      </div>
      {!isRead && <div style={unreadDotStyle}></div>}
    </li>
  );
};

export default NotificationsMenu; 