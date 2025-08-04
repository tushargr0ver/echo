# Echo Chat App - Database Schema

This directory contains the Supabase database migrations for the Echo chat application.

## Database Schema Overview

### Tables

#### 1. `users`

- **Purpose**: Store user profiles and authentication data
- **Key Fields**:
  - `id`: UUID primary key (linked to Supabase Auth)
  - `email`: User's email address (unique)
  - `name`: Display name
  - `avatar_url`: Profile picture URL
  - `is_online`: Online status
  - `last_seen`: Last activity timestamp

#### 2. `chats`

- **Purpose**: Store chat conversations (both direct and group)
- **Key Fields**:
  - `id`: UUID primary key
  - `name`: Chat name (null for direct chats)
  - `is_group`: Boolean flag for group vs direct chat
  - `created_by`: User who created the chat

#### 3. `chat_participants`

- **Purpose**: Many-to-many relationship between users and chats
- **Key Fields**:
  - `chat_id`: Reference to chats table
  - `user_id`: Reference to users table
  - `joined_at`: When user joined the chat

#### 4. `messages`

- **Purpose**: Store all chat messages
- **Key Fields**:
  - `id`: UUID primary key
  - `chat_id`: Reference to chats table
  - `user_id`: Reference to users table
  - `content`: Message content
  - `message_type`: Type of message (text, image, file, audio, video)
  - `created_at`: Message timestamp

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Users**: Can only view/update their own profile
- **Chats**: Can only view chats they participate in
- **Messages**: Can only view messages in chats they're part of
- **Chat Participants**: Can only view participants in their chats

### Policies

- Users can only access data they're authorized to see
- Message creation is restricted to chat participants
- Profile updates are restricted to the user themselves

## Performance Optimizations

### Indexes

- `idx_messages_chat_id`: For fast message retrieval by chat
- `idx_messages_created_at`: For chronological message ordering
- `idx_messages_user_id`: For user-specific message queries
- `idx_messages_chat_created`: Composite index for chat + time queries

### Functions

- `get_last_message()`: Helper function to get the most recent message in a chat
- `update_updated_at_column()`: Automatic timestamp updates

## Migration Files

1. **001_create_users.sql**: Creates users table with RLS policies
2. **002_create_chats.sql**: Creates chats and chat_participants tables
3. **003_create_messages.sql**: Creates messages table with indexes
4. **004_create_seed_data.sql**: Sample data for development

## Usage

### Apply Migrations

```bash
# Apply all migrations
supabase db push

# Reset database (development only)
supabase db reset
```

### Generate TypeScript Types

```bash
# Generate types from your Supabase schema
supabase gen types typescript --project-id your-project-id > ../frontend/src/types/database.ts
```

## Sample Queries

### Get User's Chats

```sql
SELECT c.*,
       (SELECT content FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) as last_message
FROM chats c
JOIN chat_participants cp ON c.id = cp.chat_id
WHERE cp.user_id = auth.uid();
```

### Get Chat Messages

```sql
SELECT m.*, u.name as user_name, u.avatar_url
FROM messages m
JOIN users u ON m.user_id = u.id
WHERE m.chat_id = 'chat-id'
ORDER BY m.created_at ASC;
```

### Get Chat Participants

```sql
SELECT u.id, u.name, u.avatar_url, u.is_online
FROM chat_participants cp
JOIN users u ON cp.user_id = u.id
WHERE cp.chat_id = 'chat-id';
```

## Next Steps

1. Set up Supabase project and get credentials
2. Apply migrations to your Supabase database
3. Generate TypeScript types
4. Update frontend services to use real Supabase queries
5. Implement real-time subscriptions for live chat
