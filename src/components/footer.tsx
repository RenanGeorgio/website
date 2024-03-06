import Container from './container';
import Newsletter from '@components/newsletter';
import ThemeSwitch from '@components/theme-switch';
import { Menu } from '@components/menu';
import Icon from '@components/icon';
import { EXAMPLE_PATH } from '@lib/constants';
import { SiteParams } from '@typograph/types/queries';
import { Obj } from '@typograph/types';

const footerObj: SiteParams["footer"] = {
  blocks: [] as Obj[]
}

const Footer: React.FC<any> = (data: typeof footerObj): JSX.Element => {
  const { blocks } = data; 

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200" role="contentinfo">
      <div className="footer--grid">
        {blocks.map((block, key) => (
          <div key={key} className="footer--block">
            {block.title && <p className="is-h3">{block.title}</p>}

            {block.menu?.items && (
              <Menu items={block.menu.items} className="menu-footer" />
            )}

            {block.newsletter && <Newsletter data={block.newsletter} />}

            {block.social && (
              <div className="menu-social">
                {block.social.map((link: Obj, key: string | number) => {
                  return (
                    <a
                      key={key}
                      href={link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={link?.icon} />
                    </a>
                  )
                })}
              </div>
            )}

            {/* Put our extras in the last block */}
            {key === 3 && (
              <div className="footer--extras">
                <ThemeSwitch />

                <div className="footer--disclaimer">
                  <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Statically Generated with Next.js.
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://nextjs.org/docs/basic-features/pages"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Read Documentation
            </a>
            <a
              href={`https://github.com/vercel/next.js/tree/canary/examples/${EXAMPLE_PATH}`}
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer