export const friendsAndMessagesQuery = `WITH Friends AS (
    SELECT 
        CASE 
            WHEN f.requester_id = $1 THEN f.addressee_id
            ELSE f.requester_id
        END AS friend_id
    FROM friendship f
    WHERE f.requester_id = $1
),
FilteredFriends AS (
    SELECT p.username, p.user_id, p.side, p.affinity_name
    FROM profile p
    JOIN Friends f ON f.friend_id = p.user_id
    WHERE p.username ILIKE $2
),
UserChats AS (
    SELECT uc.chat_id
    FROM users_chats uc
    WHERE uc.user_id = $1
),
FilteredChats AS (
    SELECT uc.chat_id, uc.user_id
    FROM users_chats uc
    JOIN FilteredFriends ff ON uc.user_id = ff.user_id
    WHERE uc.chat_id IN (SELECT chat_id FROM UserChats)
),
LastMessages AS (
    SELECT
        fc.chat_id,
        MAX(m.created_at) as last_message_time,
        m.message,
        m.user_id,
  m.message_id
    FROM messages m
    JOIN FilteredChats fc ON m.chat_id = fc.chat_id
  	INNER JOIN (
				  SELECT 
              chat_id,
              MAX(created_at) as last_message_time
          FROM messages
          GROUP BY chat_id
  ) lm on m.chat_id = lm.chat_id AND m.created_at = lm.last_message_time
    GROUP BY fc.chat_id, m.message, m.user_id, 5
)
SELECT
ff.user_id as "contactId",    
ff.username as "contactName",
ff.side,
ff.affinity_name as affinity,
fc.chat_id as "roomId",
lm.message as content,
lm.last_message_time as timestamp
FROM FilteredFriends ff
JOIN FilteredChats fc ON ff.user_id = fc.user_id
LEFT JOIN LastMessages lm ON fc.chat_id = lm.chat_id
ORDER BY POSITION(lower($2) IN lower(ff.username));`;
