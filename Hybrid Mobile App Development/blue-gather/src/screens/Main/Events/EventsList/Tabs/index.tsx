import React from 'react';

import { StatusFilterType, tabs } from './constants';

interface Props {
  activeOption: StatusFilterType | undefined;
  handleSelectTab: React.Dispatch<
    React.SetStateAction<StatusFilterType>
  >;
}

import { BottomTab, Container, Tab, TabText } from './styles';

export const Tabs: React.FC<Props> = ({ activeOption, handleSelectTab }) => {
  return (
    <Container>
      {tabs.map(tab => (
        <Tab onPress={() => handleSelectTab(tab)} key={tab.key} active={activeOption === tab}>
          <TabText>{tab.label}</TabText>
          <BottomTab />
        </Tab>
      ))}
    </Container>
  );
};
