import { ViewStyle, TextStyle } from "react-native";

export interface ItemTemplateProps {
  item: CountryItem;
  name: string;
  style?: Style;
  onPress?: (arg: any) => any;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
}

export interface ListHeaderComponentProps {
  countries: CountryItem[];
  lang: string;
  onPress: (item: CountryItem) => void;
}

export interface CountryItem {
  name: { [key: string]: string };
  dial_code: string;
  code: string;
  flag: string;
}

export interface Style {
  backdrop?: ViewStyle;
  modal?: ViewStyle;
  line?: ViewStyle;
  searchMessageText?: TextStyle;
  itemsList?: ViewStyle;
  modalInner?: ViewStyle;
  countryMessageContainer?: ViewStyle;
  textInput?: TextStyle;
  countryButtonStyles?: ViewStyle;
  flag?: TextStyle;
  dialCode?: TextStyle;
  countryName?: TextStyle;
}

export interface CountryPickerAccessibilityProps {
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: string;
  searchAccessibilityLabel?: string;
  searchAccessibilityHint?: string;
  countryItemAccessibilityLabel?: (
    country: CountryItem,
    name: string
  ) => string;
  countryItemAccessibilityHint?: string;
}

export interface CountryPickerPerformanceProps {
  getItemLayout?: (
    data: any,
    index: number
  ) => { length: number; offset: number; index: number };
  windowSize?: number;
  removeClippedSubviews?: boolean;
  maxToRenderPerBatch?: number;
  initialNumToRender?: number;
}
