"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme as useCustomTheme } from '../../hooks/useTheme';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
    const themeProps = useCustomTheme();

    return (
        <ThemeContext.Provider value={themeProps}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}
