export type FrontendEnvironmentVariables = Readonly<{
  BASE_URL?: string;
}>;

export const getFrontendEnvScript = (scriptContent: string): string => `
  <script>${scriptContent}</script>
`;

export const getFrontendEnvScriptContent = (processEnv: NodeJS.ProcessEnv): string => `
    const __serializedVariables = Object.freeze(${JSON.stringify(getFrontendEnvironmentVariables(processEnv))});
`;

export const getFrontendEnvironmentVariables = (processEnv: NodeJS.ProcessEnv): FrontendEnvironmentVariables => ({
  BASE_URL: processEnv.BASE_URL,
});
