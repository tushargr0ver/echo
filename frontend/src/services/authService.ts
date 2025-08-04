import { supabase } from './supabaseClient';
import { User } from '../types';

export const authService = {
    // Sign up with email and password
    signUp: async (email: string, password: string, name: string): Promise<User> => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (error) throw error;

        // Create user profile in our users table
        if (data.user) {
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: data.user.id,
                    email: data.user.email!,
                    name: name,
                    avatar_url: null,
                    is_online: true,
                    last_seen: new Date().toISOString()
                });

            if (profileError) throw profileError;
        }

        return {
            id: data.user!.id,
            email: data.user!.email!,
            name: name,
            isOnline: true
        };
    },

    // Sign in with email and password
    signIn: async (email: string, password: string): Promise<User> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        // Update user's online status
        if (data.user) {
            await supabase
                .from('users')
                .update({
                    is_online: true,
                    last_seen: new Date().toISOString()
                })
                .eq('id', data.user.id);
        }

        // Get user profile from our users table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user!.id)
            .single();

        if (userError) throw userError;

        return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            isOnline: userData.is_online
        };
    },

    // Sign out
    signOut: async (): Promise<void> => {
        const { data: { user } } = await supabase.auth.getUser();

        // Update user's offline status before signing out
        if (user) {
            await supabase
                .from('users')
                .update({
                    is_online: false,
                    last_seen: new Date().toISOString()
                })
                .eq('id', user.id);
        }

        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Get current user
    getCurrentUser: async (): Promise<User | null> => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        // Get user profile from our users table
        const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) throw error;

        return {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            isOnline: userData.is_online
        };
    },

    // Listen to auth state changes
    onAuthStateChange: (callback: (user: User | null) => void) => {
        return supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                // Get user profile from our users table
                const { data: userData } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (userData) {
                    callback({
                        id: userData.id,
                        email: userData.email,
                        name: userData.name,
                        isOnline: userData.is_online
                    });
                }
            } else {
                callback(null);
            }
        });
    },

    // Update user profile
    updateProfile: async (updates: Partial<User>): Promise<User> => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('No authenticated user');

        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

        if (error) throw error;

        return {
            id: data.id,
            email: data.email,
            name: data.name,
            isOnline: data.is_online
        };
    }
};