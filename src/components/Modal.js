import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconWrong } from '@icon/wrong.svg';

const Container = styled(({ className, ...rest }) => {
  const [content, setContent] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const inputEl = useRef(null);

  const open = (content) => {
    setContent(content);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setContent(null);
  };

  useEffect(() => {
    inputEl.current.open = (props) => open(props);
    inputEl.current.close = () => close();
  }, []);

  return (
    <article
      ref={inputEl}
      className={`modal-container ${className}`}
      {...rest}
      data-open={isOpen}
      onClick={() => close()}
    >
      <div className="modal-background" />
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <IconWrong className="modal-close" onClick={() => close()} />
        {content}
      </div>
    </article>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  //transition: opacity 1s ease-out;

  .modal-background {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transition: opacity 0.2s ease-out;
    background: var(--theme--modal--cover--background, rgba(0, 0, 0, 0.7));
    z-index: 1;
    cursor: alias;
    opacity: 0;
    backdrop-filter: blur(1rem);
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    height: auto;
    width: auto;
    max-width: 100rem;
    width: 70rem;
    max-width: 90vw;
    min-height: 15rem;
    background: var(--theme--modal--background, white);
    color: var(--theme--modal--color, black);
    //box-shadow: 0 0 3rem rgba(0,0,0,0.7);
    z-index: 2;
    line-height: 1.6em;
    border-radius: var(--theme--border-radius);
    padding: var(--theme--spacing-loose, 1rem);

    opacity: 0;
    transform: translate(-50%, -50%) scale(1.05);
    transition: all 0.15s ease-in-out;

    .modal-close {
      position: absolute;
      top: 2.4rem;
      right: 2.4rem;
      font-size: var(--font-size-large);
      cursor: pointer;
      color: var(--theme--modal--color, black);
      transition: all 0.15s;

      &:hover {
        color: var(--color-grey-500);
      }
    }

    .modal-title {
      font-size: var(--font-size-xlarge);
      margin-top: 0;
    }

    .modal-subtitle {
      font-size: var(--font-size-medium);
    }

    .modal-content {
      font-size: var(--font-size-normal);
    }
  }

  &[data-open='true'] {
    opacity: 1;
    pointer-events: all;

    .modal-background {
      opacity: 1;
    }

    .modal {
      opacity: 1;
      transform: translate(-50%, -60%) scale(1);
    }
  }
`;

Container.open = (props) => document.querySelector('.modal-container')?.open(props);
Container.close = () => document.querySelector('.modal-container')?.close();

export default Container;
