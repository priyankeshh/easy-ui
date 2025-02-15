import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames('flex items-center p-5 border-b h-[var(--header-height)] transition-opacity duration-300', {
        'border-transparent': !chat.started,
        'border-easyui-elements-borderColor': chat.started,
        'opacity-0': chat.started, // Hide the header when chat starts
      })}
    >
      {!chat.started && (
        <div className="flex items-center gap-2 text-easyui-elements-textPrimary cursor-pointer pt-5">
          <div className="i-ph:sidebar-simple-duotone text-4xl pt-5" />
          <a href="/" className="text-2xl font-semibold text-accent flex items-center pl-4">
            <img src="/logo-dark-styled.png" alt="logo" className="w-[120px] mt-1  inline-block dark:hidden" />
            <img src="/logo-dark-styled.png" alt="logo" className="w-[150px] mt-1  inline-block hidden dark:block" />
          </a>
        </div>
      )}
      {chat.started && ( // Display ChatDescription and HeaderActionButtons only when the chat has started.
        <>
          <span className="flex-1 px-4 truncate text-center text-easyui-elements-textPrimary">
            <ClientOnly>{() => <ChatDescription />}</ClientOnly>
          </span>
          <ClientOnly>
            {() => (
              <div className="mr-1">
                <HeaderActionButtons />
              </div>
            )}
          </ClientOnly>
        </>
      )}
    </header>
  );
}
