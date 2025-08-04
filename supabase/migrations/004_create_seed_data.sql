-- Seed data for testing
-- Note: These are example users for development purposes

-- Insert sample users (you'll need to replace these with real auth users)
INSERT INTO users (id, email, name, avatar_url, is_online) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'alice@example.com', 'Alice Johnson', null, true),
  ('550e8400-e29b-41d4-a716-446655440002', 'bob@example.com', 'Bob Smith', null, false),
  ('550e8400-e29b-41d4-a716-446655440003', 'sarah@example.com', 'Sarah Wilson', null, true),
  ('550e8400-e29b-41d4-a716-446655440004', 'mike@example.com', 'Mike Davis', null, false);

-- Insert sample chats (using proper UUID format)
INSERT INTO chats (id, name, is_group, created_by) VALUES
  ('550e8400-e29b-41d4-a716-446655440101', null, false, '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440102', null, false, '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440103', 'Project Team', true, '550e8400-e29b-41d4-a716-446655440001');

-- Insert chat participants
INSERT INTO chat_participants (chat_id, user_id) VALUES
  -- Direct chat between Alice and Bob
  ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440002'),
  
  -- Direct chat between Alice and Sarah
  ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440003'),
  
  -- Group chat with all users
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440004');

-- Insert sample messages
INSERT INTO messages (chat_id, user_id, content, message_type, created_at) VALUES
  -- Messages in Alice-Bob chat
  ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440002', 'Hey Alice! How are you doing?', 'text', NOW() - INTERVAL '30 minutes'),
  ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440001', 'I am doing great! Thanks for asking. How about you?', 'text', NOW() - INTERVAL '25 minutes'),
  ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440002', 'Pretty good! Working on some exciting projects lately.', 'text', NOW() - INTERVAL '20 minutes'),
  
  -- Messages in Alice-Sarah chat
  ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440003', 'Can we schedule a meeting tomorrow?', 'text', NOW() - INTERVAL '2 hours'),
  ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440001', 'Sure! What time works for you?', 'text', NOW() - INTERVAL '1 hour 55 minutes'),
  
  -- Messages in group chat
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001', 'Welcome everyone to the project team!', 'text', NOW() - INTERVAL '1 day'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440002', 'Thanks Alice! Looking forward to working together.', 'text', NOW() - INTERVAL '23 hours'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440003', 'Great to be here!', 'text', NOW() - INTERVAL '22 hours'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440004', 'Hello team!', 'text', NOW() - INTERVAL '21 hours'); 