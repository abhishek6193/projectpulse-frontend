import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.div`
  position: relative;

  .page-enter {
    opacity: 0;
  }
  .page-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in-out;
  }
  .page-exit {
    opacity: 1;
  }
  .page-exit-active {
    opacity: 0;
  }
`;

const TransitionWrapper = ({ children }) => {
  const [inProp, setInProp] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setInProp(false);
    const timer = setTimeout(() => setInProp(true), 0);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <PageContainer>
      <CSSTransition classNames="page" in={inProp} timeout={500}>
        {children}
      </CSSTransition>
    </PageContainer>
  );
};

export default TransitionWrapper;
