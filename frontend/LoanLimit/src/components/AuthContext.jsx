import React from 'react';
import { createContext } from "react";

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    isAuthenticated: false,
    setUser: () => {},
    });