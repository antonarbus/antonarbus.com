'use client'


import { Code, H, jsxToStr } from '/components/post/reExport'
import { useModalWithBackground } from '/functions/useModalWithBackground'
import { useModalWithoutBackground } from '/functions/useModalWithoutBackground'

function ModalWithBackground() {
  const [showModalState, openModal, Modal] = useModalWithBackground()
  return (
    <div>
      <div>Parent component</div>
      <button onClick={openModal}>Show modal window</button>
      {showModalState && <Modal>Modal child component</Modal>}
    </div>
  )
}

function ModalWithoutBackground() {
  const [showModalState, openModal, Modal] = useModalWithoutBackground()
  return (
    <div>
      <button onClick={openModal}>Show modal window</button>
      {showModalState && <Modal>Modal child component</Modal>}
    </div>
  )
}

const postObj = {
  title: 'modal',
  date: '2021.10.28',
  tags: ['react'],
  imgUrl: 'https://antonarbus.com/imgs/modal.png',
  desc: 'modal window in React',
  body: (
    <>
      <H>With background</H>

      <ModalWithBackground />

      <p>
        In styled components let's make a gray transparent background layer with fixed position
        which covers whole screen. Content will be positioned 20hv from the top.
      </p>

      <p>
        Modal window has just a basic styling with absolute positioned{' '}
        <span
          style={{
            fontSize: '30px',
            color: 'red',
            position: 'relative',
            top: '3px',
            cursor: 'pointer'
          }}
        >
          ×
        </span>{' '}
        close button as a span in the right top corner.
      </p>

      <p>Parent component has a button to show the modal window.</p>

      <Code block jsx>{`
          import React from 'react';
          import { useModalWithBackground } from '../../../helpers/functions/useModalWithBackgroundReact';

          function Parent() {
            const [showModalState, openModal, Modal] = useModalWithBackground();
            return (
              <div>
                <div>Parent component</div>
                <button onClick={openModal}>Show modal window</button>
                {showModalState && <Modal>Modal child component</Modal>}
              </div>
            );
          }
          const toRender = <Parent />;
          `}</Code>

      <p>Modal window and its control comes from custom hook.</p>

      <Code block jsx>{`
          // useModalWithBackgroundReact.js
          import React, { useEffect, useState } from 'react';
          import styled from 'styled-components';

          export function useModalWithBackground() {
            const [showModalState, setShowModalState] = useState(false);
            const openModal = () => setShowModalState(true)
            const closeModal = () => setShowModalState(false)

            function Modal(props) {
              // prevent body scroll & prevent jumping when scrollbar gets hidden
              document.body.style.width = window.getComputedStyle(document.body).width;
              document.body.style.overflowY = 'hidden';

              useEffect(() => {
                function closeModalOnEscape(e) {
                  if (e.key === 'Escape') closeModal();
                }

                document.addEventListener('keydown', closeModalOnEscape);
                
                return () => {
                  // on unmount put back scrolling & original width
                  document.body.style.overflowY = 'auto';
                  document.body.style.width = 'auto';
                  // do not listen for Esc
                  document.removeEventListener('keydown', closeModalOnEscape);
                };
            
              }, [showModalState]);
            
              return (
                <Bkg onClick={closeModal}>
                  <Container onClick={e => e.stopPropagation()}>
                    <CloseBtn onClick={closeModal} />
                    {props.children}
                  </Container>
                </Bkg>
              );
            }

            return [showModalState, openModal, Modal]
          }

          const Bkg = styled.div\`
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: #000000b5;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 20vh;
            z-index: 1000;
            backdrop-filter: blur(4px);
          \`;

          const Container = styled.div\`
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-content: flex-start;
            align-items: center;
            padding: 20px;
            border-radius: 10px;
            background-color: transparent;
            background-image: linear-gradient(to right bottom, rgb(255 255 255 / 70%), rgb(255 255 255 / 90%));
          \`;

          const CloseBtn = styled.span\`
            position: absolute;
            top: -48px;
            right: -10px;
            color: #c1c1c1;
            font-size: 34px;
            cursor: pointer;

            &:hover {
              transition: color 0.3s ease;
              color: white;
            }

            &:after {
              content: '×';
            }
          \`;
          `}</Code>

      <p>
        In modal window component we can close it with <i>onClick</i> event on the dimmed background
        layer & on the close button. <br />
        <br />
        To prevent <i>onClick</i> an event trigger on grey layer from bubbling we disable event
        propagation on modal window.
      </p>

      <p>
        Before modal component renders we prevent body scroll and fix its width to avoid jumping due
        to scrollbar disappear.
      </p>

      <p>
        After initial render with <Code>useEffect()</Code> we launch listener for a <kbd>Esc</kbd>{' '}
        keypress to close the modal window.
      </p>

      <p>
        On component unmount we clean our code brought by <i>useEffect</i> and return auto body
        width.
      </p>

      <H>With background</H>

      <ModalWithoutBackground />

      <p>
        Modal window has a basic styling with fixed position and{' '}
        <span
          style={{
            fontSize: '30px',
            color: 'red',
            position: 'relative',
            top: '3px',
            cursor: 'pointer'
          }}
        >
          ×
        </span>{' '}
        close button.
      </p>

      <p>Parent component has a button to show the modal window.</p>

      <Code block jsx>{`
        import React from 'react';
        import { useModalWithoutBackground } from '../../../helpers/functions/usemodalWithoutBackgroundReact';

        function Parent() {
          const [showModalState, openModal, Modal] = useModalWithoutBackground();
          return (
            <div>
              <div>Parent component</div>
              <button onClick={openModal}>Show modal window</button>
              {showModalState && <Modal>Modal child component</Modal>}
            </div>
          );
        }
        
        const toRender = <Parent />;
      `}</Code>

      <p>Modal window and its control comes from the custom hook.</p>

      <Code block jsx>{`
        // useModalWithBackgroundReact.js
        export function useModalWithoutBackground() {

          const [showModalState, setShowModalState] = useState(false);
          const modalRef = useRef();
          
          const openModal = () => setShowModalState(true);
          const closeModal = () => setShowModalState(false);
        
          function Modal(props) {
        
            useEffect(() => {
              function closeModalOnEscape(e) {
                if (e.key === 'Escape') closeModal();
              }
        
              function isClickedElOutsideThisEl(clickedEl, thisEl) {
                return thisEl.contains(clickedEl) ? false : true;
              }
        
              function closeModalOnClickOutside(e) {
                const modalWindow = modalRef.current;
                const clickedEl = e.target;
                if (!modalWindow) return;
                if (isClickedElOutsideThisEl(clickedEl, modalWindow)) closeModal();
              }
        
              document.addEventListener('mousedown', closeModalOnClickOutside);
              document.addEventListener('keydown', closeModalOnEscape);
        
              return () => {
                document.removeEventListener('mousedown', closeModalOnClickOutside);
                document.removeEventListener('keydown', closeModalOnEscape);
              };
        
            }, [showModalState]);
        
            return (
              <Box ref={modalRef}>
                <CloseBtn onClick={closeModal} />
                {props.children}
              </Box>
            );
          }
        
          return [showModalState, openModal, Modal];
        }

        const Box = <styled className="div"></styled>\` 
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          top: 20vh;
          color: white;
          background-color: #505050;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 10px 0px #8b8b8b;
        \`

        const CloseBtn = <styled className="span"></styled>\`
          position: absolute;
          top: -48px;
          right: -10px;
          color: #4e4e4e;
          font-size: 34px;
          cursor: pointer;

          &:hover {
            transition: color 0.3s ease;
            color: red;
          }

          &:after {
            content: '×';
          }
        \`
      `}</Code>

      <p>
        On the modal window mount we start listening for click events to close the window. We close
        modal if click event target element is outside of modal element.
      </p>

      <p>
        We also close the window on <kbd>Esc</kbd> button.
      </p>

      <p>On component unmount we clean our code from event listeners.</p>
    </>
  )
}

export default postObj

export const post = {
  title: postObj.title,
  date: postObj.date,
  tags: postObj.tags,
  desc: postObj.desc,
  imgUrl: postObj.imgUrl || null,
  bodyStr: jsxToStr(postObj.body)
}
