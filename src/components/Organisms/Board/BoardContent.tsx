import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

interface ParamType {
  id: string;
}
const BoardContent = () => {
  const { id }: ParamType = useParams();
  return <div>BoardContent {id}</div>;
};

export default BoardContent;
