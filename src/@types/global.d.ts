declare global {
  interface Window {
    zenn: ZennAPI;
    fileIO: FileIoAPI;
  }
}

export interface ZennAPI {
  markdownToHtml: (doc: string) => string;
}

export interface FileIoAPI {
  saveMarkdownData: (data: string) => void;
}
