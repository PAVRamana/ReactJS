/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { default_theme } from 'exp-ui-web-components-mfe';
import RouteProvider from 'packages';
import useSWR from 'swr';
import { FeatureProvider } from 'packages/common/feature-provider';
import { useFetchConfigurations } from 'packages/common/feature-provider/fetchConfigs.hook';
import { setLablesInfo } from 'packages/common/service/redux/slices/labelsSlice';
import { useAppDispatch } from 'packages/common/service/redux/store';
import { URL } from 'packages/utils/constants';
import { Spinner } from '@wayfarer/components';
import { LabelsDataType } from 'mocks/data/labelDetails';
import api from 'packages/common/service/axios';

import './app.scss';

function App() {
  const configData = useFetchConfigurations();
  const dispatch = useAppDispatch();

  const { data: labelDetails } = useSWR<LabelsDataType, Error>(
    [URL.labelDetails, { key: 'homePage' }],
    ([url, data]) => api.post<LabelsDataType>(url, data).then((res) => res?.data)
  );

  useEffect(() => {
    setTimeout(() => {
      const header = document?.getElementById('spHeaderPanelDiv');
      const footer = document?.getElementById('bodyDivFooter');
      if (header) {
        header?.setAttribute('style', 'display:none');
      }
      if (footer) {
        footer?.setAttribute('style', 'display:none');
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (labelDetails) {
      dispatch(setLablesInfo({ data: labelDetails }));
    }
  }, [labelDetails]);

  return (
    <React.Fragment>
      {configData && labelDetails ? (
        <FeatureProvider values={configData}>
          <ThemeProvider theme={default_theme}>
            <GlobalStyles />
            <RouteProvider />
          </ThemeProvider>
        </FeatureProvider>
      ) : (
        <Spinner appearance='branded' active />
      )}
    </React.Fragment>
  );
}

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font: 400 14px / 20px Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${(p) => p.theme.fontSize13} !important;
    background: ${(p) => p.theme.colorGray200}; 
  }
  
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  *::-webkit-scrollbar-track {
    background:  ${(p) => p.theme.colorGray200};
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.colorGray800};
    border-radius: ${(p) => p.theme.cornerRadius5};
  } 
`;

export default App;
