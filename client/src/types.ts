export type Token = string | null;

export interface User {
    id: string;
    username: string;
    name: string;
};

export interface LoginData {
    username: string;
    password: string;
};

export interface LoggedUserData {
    token: string;
    username: string;
    name: string;
    id: string;
};

export type LoggedUser = LoggedUserData | null;

export interface Blog {
    id?: string;
    title: string;
    author: string;
    url: string;
    likes: number;
    comments: string[];
    user_id?: string;
};

type SeverityTypes = "error" | "success" | "info" | "warning" | undefined;

export interface Message {
    open: boolean;
    severity: SeverityTypes;
    text: string;
};

export interface Topic {
    id: string;
    name: string;
    user_id: string;
};

export type TopicWithoutId = Omit<Topic, 'id'>;

export interface ChatMessage {
    id: string;
    message: string;
    user_id: string;
    topic_id: string;
};

export type ChatMessageWithoutId = Omit<ChatMessage, 'id'>;

export type VisibilityTypes = "visible" | "hidden";

export interface Visibility {
    visibility: VisibilityTypes;
}
