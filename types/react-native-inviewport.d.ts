declare module 'react-native-inviewport' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface InViewPortProps extends ViewProps {
    onChange: (isVisible: boolean) => void;
    delay?: number;
  }

  export default class InViewPort extends Component<InViewPortProps> {}
}
