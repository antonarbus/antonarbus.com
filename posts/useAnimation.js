import { Code, jsxToStr } from '/components/post/reExport'
import useAnimatedWrapper from '/functions/useAnimatedWrapper'

const divCss = { background: '#e6c0c0', margin: '5px', padding: '5px', cursor: 'pointer' }
const options = {
  wrapperCss: { background: 'OldLace', margin: '5px', padding: '5px', cursor: 'pointer' },
  animationEndFunc: () => alert('Hello after animation'),
  animationCss: { animationDuration: '.25s', keyframes: ' 0% { transform: translateX(0) } 10% { transform: translateX(5px) } 30% { transform: translateX(0) } 50% { transform: translateX(5px) } 70% { transform: translateX(0) } 90% { transform: translateX(5px) } 100% { transform: translateX(0) }  ' }
}

function Component() {
  const [AnimationWrapper, turnAnimationOn] = useAnimatedWrapper()
  const [AnimationWrapper2, turnAnimationOn2] = useAnimatedWrapper(options)

  return (
    <>
      <div>
        <AnimationWrapper><div style={divCss}>Default animation</div></AnimationWrapper>
        <button onClick={turnAnimationOn}>Start animation</button>
      </div>

      <div>
        <AnimationWrapper2>Custom animation without inner element</AnimationWrapper2>
        <button onClick={turnAnimationOn2}>Start animation</button>
      </div>
    </>
  )
}

const postObj = {
  title: 'useAnimation',
  date: '2021.10.31',
  tags: ['react', 'hook'],
  imgUrl: 'https://antonarbus.com/imgs/animation.jpg',
  desc: 'xxx',
  body: (
    <>
      <p>
        Custom hook returns inline-block wrapper and the function to turn animation on.
        Function accepts an object with animation css properties.
      </p>

      <Code block jsx>{`
        // useAnimatedWrapper.js
        import { useState } from 'react';
        import styled, { keyframes } from 'styled-components';

        export default function useAnimatedWrapper(args) {
          const options = {
            animationCss: {
              keyframes: \`
                from { transform: scaleY(0); }
                to { transform: scaleY(1); }
              \`,
              animationDuration: '0.3s',
              animationTimingFunction: 'ease-in-out',
              animationDelay: '0s',
              animationIterationCount: 1,
              animationDirection: 'normal',
              animationFillMode: 'forwards',
              ...args?.animationCss,
            },
            animationEndFunc: args?.animationEndFunc || null,
            wrapperCss: {...args?.wrapperCss || ''},
          };

          const [animationState, setAnimationState] = useState(false);
          const turnAnimationOn = () => setAnimationState(true);

          function AnimationWrapper(props) {
            return (
              <Div
                style={!!options?.wrapperCss && options.wrapperCss}
                onAnimationEnd={() => {
                  setAnimationState(false);
                  !!options?.animationEndFunc && options.animationEndFunc();
                }}
                isAnimationOn={animationState}
                css={options.animationCss}
              >
                {props.children}
              </Div>
            );
          }

          return [AnimationWrapper, turnAnimationOn];
        }

        const animationName = keyframeRules => keyframes\`\${keyframeRules}\`;

        const Div = styled.div\`
          display: inline-block;

          animation-name: \${props => props.isAnimationOn ? animationName(props.css.keyframes) : ''};
          animation-duration: \${props => props.css.animationDuration};
          animation-timing-function: \${props => props.css.animationTimingFunction};
          animation-delay: \${props => props.css.animationDelay};
          animation-iteration-count: \${props => props.css.animationIterationCount};
          animation-direction: \${props => props.css.animationDirection};
          animation-fill-mode: \${props => props.css.animationFillMode};
        \`;
      `}</Code>

      <p>
        Usage
      </p>

      <Code block jsx>{`
        import React from 'react';
        import useAnimatedWrapper from '../../../helpers/functions/useAnimatedWrapper';
        
        const divCss = { background: '#e6c0c0', margin: '5px', padding: '5px', cursor: 'pointer' };
        const options = {
          wrapperCss: { background: 'OldLace', margin: '5px', padding: '5px', cursor: 'pointer'},
          animationEndFunc: () => alert('Hello after animation'),
          animationCss: { animationDuration: '.25s', keyframes: \` 0% { transform: translateX(0) } 10% { transform: translateX(5px) } 30% { transform: translateX(0) } 50% { transform: translateX(5px) } 70% { transform: translateX(0) } 90% { transform: translateX(5px) } 100% { transform: translateX(0) }  \`, },
        };
        
        function Component() {
          const [AnimationWrapper, turnAnimationOn] = useAnimatedWrapper();
          const [AnimationWrapper2, turnAnimationOn2] = useAnimatedWrapper(options);
        
          return (
            <>
              <div>
                <AnimationWrapper><div style={divCss}>Default animation</div></AnimationWrapper>
                <button onClick={turnAnimationOn}>Start animation</button>
              </div>
        
              <div>
                <AnimationWrapper2>Custom animation without inner element</AnimationWrapper2>
                <button onClick={turnAnimationOn2}>Start animation</button>
              </div>
            </>
          );
        }
      `}</Code>

      <Component />
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
