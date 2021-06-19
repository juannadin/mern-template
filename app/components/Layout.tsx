import React, { FunctionComponent } from 'react';

type LayoutProps = {};

const Layout: FunctionComponent<LayoutProps> = () => (
  <html lang="en-US">
    {'{{children}}'}
  </html>
);

export default Layout;
