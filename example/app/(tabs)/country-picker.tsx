import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts, Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Collapsible } from "@/components/ui/collapsible";

// Import from local copy
import { CountryPicker, CountryItem } from "../../src/country-picker/index";

export default function CountryPickerScreen() {
  const colorScheme = useColorScheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(
    null
  );

  // For advanced example
  const [showAdvancedPicker, setShowAdvancedPicker] = useState(false);
  const [advancedSelectedCountry, setAdvancedSelectedCountry] =
    useState<CountryItem | null>(null);

  const handleCountrySelect = (country: CountryItem) => {
    setSelectedCountry(country);
    setShowPicker(false);
  };

  const handleAdvancedCountrySelect = (country: CountryItem) => {
    setAdvancedSelectedCountry(country);
    setShowAdvancedPicker(false);
  };

  // Custom country button component for advanced example
  const CustomCountryButton = ({ item, name, onPress, style }: any) => (
    <TouchableOpacity
      style={[
        styles.customButton,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedView style={styles.buttonContent}>
        <ThemedText style={styles.flag}>{item.flag}</ThemedText>
        <ThemedView style={styles.countryInfo}>
          <ThemedText style={styles.countryName}>{name}</ThemedText>
          <ThemedText style={styles.dialCode}>{item.dial_code}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  // Popular countries header component
  const PopularCountriesHeader = ({ countries, onPress, lang }: any) => (
    <ThemedView style={styles.popularSection}>
      <ThemedText style={styles.popularTitle}>Popular Countries</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {countries.map((country: CountryItem, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.popularButton}
            onPress={() => onPress(country)}
          >
            <ThemedText style={styles.popularFlag}>{country.flag}</ThemedText>
            <ThemedText style={styles.popularCode}>
              {country.dial_code}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );

  const popularCountries = [
    "US",
    "GB",
    "CA",
    "AU",
    "DE",
    "FR",
    "JP",
    "CN",
    "VN",
  ];
  const excludedCountries = ["AQ"]; // Exclude Antarctica

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <IconSymbol
          size={310}
          color={colorScheme === "dark" ? "#2D5D6D" : "#7DBDD2"}
          name="globe.americas.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Country Picker
        </ThemedText>
      </ThemedView>

      <ThemedText>
        Test the country picker library with basic and advanced examples.
      </ThemedText>

      {/* Basic Example */}
      <Collapsible title="Basic Example">
        <ThemedView style={styles.selectedCountryContainer}>
          <ThemedText style={styles.label}>Selected Country:</ThemedText>
          {selectedCountry ? (
            <ThemedView style={styles.countryInfo}>
              <ThemedText style={styles.flag}>
                {selectedCountry.flag}
              </ThemedText>
              <ThemedText style={styles.countryName}>
                {selectedCountry.name.en}
              </ThemedText>
              <ThemedText style={styles.dialCode}>
                {selectedCountry.dial_code}
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedText style={styles.noSelection}>
              No country selected
            </ThemedText>
          )}
        </ThemedView>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme ?? "light"].tint },
          ]}
          onPress={() => setShowPicker(true)}
        >
          <ThemedText style={styles.buttonText}>
            {selectedCountry ? "Change Country" : "Select Country"}
          </ThemedText>
        </TouchableOpacity>

        <CountryPicker
          show={showPicker}
          pickerButtonOnPress={handleCountrySelect}
          onBackdropPress={() => setShowPicker(false)}
          lang="en"
          inputPlaceholder="Search countries..."
          searchMessage="No countries found"
          enableModalAvoiding={true}
          androidWindowSoftInputMode="pan"
          initialCountry={selectedCountry?.dial_code || "+1"}
          scrollToInitialCountry={true}
          style={{
            modal: {
              backgroundColor: Colors[colorScheme ?? "light"].background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
            textInput: {
              backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#f8f9fa",
              color: Colors[colorScheme ?? "light"].text,
              borderRadius: 12,
              paddingHorizontal: 15,
              fontSize: 16,
            },
            itemsList: {
              maxHeight: 400,
            },
            countryName: {
              color: Colors[colorScheme ?? "light"].text,
            },
            dialCode: {
              color: Colors[colorScheme ?? "light"].tint,
            },
          }}
        />
      </Collapsible>

      {/* Advanced Example */}
      <Collapsible title="Advanced Example">
        <ThemedView style={styles.selectedCountryContainer}>
          <ThemedText style={styles.label}>Selected Country:</ThemedText>
          {advancedSelectedCountry ? (
            <ThemedView style={styles.countryInfo}>
              <ThemedText style={styles.flag}>
                {advancedSelectedCountry.flag}
              </ThemedText>
              <ThemedText style={styles.countryName}>
                {advancedSelectedCountry.name.en}
              </ThemedText>
              <ThemedText style={styles.dialCode}>
                {advancedSelectedCountry.dial_code}
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedText style={styles.noSelection}>
              No country selected
            </ThemedText>
          )}
        </ThemedView>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF6B6B" }]}
          onPress={() => setShowAdvancedPicker(true)}
        >
          <ThemedText style={styles.buttonText}>
            Open Advanced Picker
          </ThemedText>
        </TouchableOpacity>

        <CountryPicker
          show={showAdvancedPicker}
          pickerButtonOnPress={handleAdvancedCountrySelect}
          onBackdropPress={() => setShowAdvancedPicker(false)}
          lang="en"
          inputPlaceholder="Search countries..."
          searchMessage="No countries found"
          enableModalAvoiding={true}
          popularCountries={popularCountries}
          excludedCountries={excludedCountries}
          itemTemplate={CustomCountryButton}
          ListHeaderComponent={PopularCountriesHeader}
          style={{
            modal: {
              backgroundColor: Colors[colorScheme ?? "light"].background,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "80%",
            },
            textInput: {
              backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#f8f9fa",
              color: Colors[colorScheme ?? "light"].text,
              borderRadius: 12,
              paddingHorizontal: 15,
              fontSize: 16,
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#3A3A3C" : "#e0e0e0",
            },
            itemsList: {
              maxHeight: 400,
            },
            line: {
              backgroundColor: "#FF6B6B",
              height: 2,
            },
          }}
        />
      </Collapsible>

      {/* Features */}
      <Collapsible title="Library Features">
        <ThemedText style={styles.feature}>
          • Search countries by name or dial code
        </ThemedText>
        <ThemedText style={styles.feature}>
          • Animated modal with backdrop
        </ThemedText>
        <ThemedText style={styles.feature}>• Keyboard handling</ThemedText>
        <ThemedText style={styles.feature}>
          • Light and dark mode support
        </ThemedText>
        <ThemedText style={styles.feature}>
          • Custom country button components
        </ThemedText>
        <ThemedText style={styles.feature}>
          • Popular countries section
        </ThemedText>
        <ThemedText style={styles.feature}>
          • Country exclusion/inclusion
        </ThemedText>
        <ThemedText style={styles.feature}>• TypeScript support</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    right: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  selectedCountryContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  countryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  countryName: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
  },
  dialCode: {
    fontSize: 16,
    fontWeight: "600",
  },
  noSelection: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  feature: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
  // Custom country button styles
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Popular countries styles
  popularSection: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  popularButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    minWidth: 60,
  },
  popularFlag: {
    fontSize: 20,
    marginBottom: 2,
  },
  popularCode: {
    fontSize: 12,
    fontWeight: "500",
  },
});
