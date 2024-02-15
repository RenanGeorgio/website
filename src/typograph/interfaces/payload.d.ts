/* tslint:disable */
export interface Config {
    collections: {
        pages: Page;
        users: User;
        media: Media;
    };
    globals: {
        "main-menu": MainMenu;
    };
}

export interface Page {
    id: string;
    title: string;
    hero: {
        type: "highImpact" | "mediumImpact" | "lowImpact";
        richText: {
            [k: string]: unknown;
        }[];
        links: {
            link: {
                type?: "reference" | "custom";
                newTab?: boolean;
                reference: {
                    value: string | Page;
                    relationTo: "pages";
                };
                url: string;
                label: string;
                appearance?: "default" | "primary" | "secondary";
            };
            id?: string;
        }[];
        media: string | Media;
    };
    layout: (
      | {
          ctaBackgroundColor?: "white" | "black";
          richText: {
            [k: string]: unknown;
          }[];
          links: {
            link: {
                type?: "reference" | "custom";
                newTab?: boolean;
                reference: {
                    value: string | Page;
                    relationTo: "pages";
                };
                url: string;
                label: string;
                appearance?: "primary" | "secondary";
            };
            id?: string;
          }[];
          id?: string;
          blockName?: string;
          blockType: "cta";
        }
      | {
          contentBackgroundColor?: "white" | "black";
          layout?:
            | "oneColumn"
            | "twoThirdsOneThird"
            | "halfAndHalf"
            | "threeColumns";
          columnOne: {
            richText: {
                [k: string]: unknown;
            }[];
            enableLink?: boolean;
            link: {
                type?: "reference" | "custom";
                newTab?: boolean;
                reference: {
                    value: string | Page;
                    relationTo: "pages";
                };
                url: string;
                label: string;
                appearance?: "default" | "primary" | "secondary";
            };
          };
          columnTwo: {
            richText: {
                [k: string]: unknown;
            }[];
            enableLink?: boolean;
            link: {
                type?: "reference" | "custom";
                newTab?: boolean;
                reference: {
                    value: string | Page;
                    relationTo: "pages";
                };
                url: string;
                label: string;
                appearance?: "default" | "primary" | "secondary";
            };
          };
          columnThree: {
            richText: {
                [k: string]: unknown;
            }[];
            enableLink?: boolean;
            link: {
                type?: "reference" | "custom";
                newTab?: boolean;
                reference: {
                    value: string | Page;
                    relationTo: "pages";
                };
                url: string;
                label: string;
                appearance?: "default" | "primary" | "secondary";
            };
          };
          id?: string;
          blockName?: string;
          blockType: "content";
        }
      | {
          mediaBlockBackgroundColor?: "white" | "black";
          position?: "default" | "fullscreen";
          media: string | Media;
          caption?: {
            [k: string]: unknown;
          }[];
          id?: string;
          blockName?: string;
          blockType: "mediaBlock";
        }
    )[];
    slug?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Media {
    id: string;
    alt: string;
    url?: string;
    filename?: string;
    mimeType?: string;
    filesize?: number;
    width?: number;
    height?: number;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    email?: string;
    resetPasswordToken?: string;
    resetPasswordExpiration?: string;
    loginAttempts?: number;
    lockUntil?: string;
    createdAt: string;
    updatedAt: string;
    password?: string;
}

export interface MainMenu {
    id: string;
    navItems: {
        link: {
            type?: "reference" | "custom";
            newTab?: boolean;
            reference: {
                value: string | Page;
                relationTo: "pages";
            };
            url: string;
            label: string;
        };
        id?: string;
    }[];
}