declare global {
  interface Window {
    zenn: ZennAPI;
  }
}

export interface ZennAPI {
  markdownToHtml: (doc: string) => string;
}
