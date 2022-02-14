declare global {
  interface Window {
    zenn: ZennAPI;
    store: StoreAPI;
  }
}

export interface ZennAPI {
  markdownToHtml: (doc: string) => string;
}

export interface StoreAPI {
  setMarkdownData: (data: string) => void;
}
