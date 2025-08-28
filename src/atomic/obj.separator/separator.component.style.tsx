import type React from 'react';

export const Separator: React.FC<{ size?: string }> = ({ size }) => <div style={{ marginBottom: size || '24px ' }} />;
