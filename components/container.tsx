import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string; // Make className an optional prop
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
    // Combine the default container class with any custom class names passed in
    const containerClass = `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || ''}`;

    return (
        <div className={containerClass}>
            {children}
        </div>
    )
}

export default Container;
