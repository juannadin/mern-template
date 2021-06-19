import React, { FunctionComponent } from 'react';

type ViewProps = {
  title: string;
};

const View: FunctionComponent<ViewProps> = ({ title }) => (
  <h1>{title}</h1>
);

export default View;
