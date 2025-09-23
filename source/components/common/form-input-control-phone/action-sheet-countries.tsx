import countriesEN from "@/core/countries/en.json";
import { ICountry } from "@/types";
import React, { FC, useCallback, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetVirtualizedList,
} from "@/components/ui/actionsheet";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

type ActionsheetCountriesProps = {
  showActionsheet: boolean;
  handleClose: () => void;
  setSelectCountry: React.Dispatch<React.SetStateAction<ICountry>>;
};

const ActionsheetCountries: FC<ActionsheetCountriesProps> = ({
  showActionsheet,
  handleClose,
  setSelectCountry,
}) => {
  const [query, setQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const countries = countriesEN.data;
    if (!query) return countries;
    return countries.filter((country) => {
      const queryLower = query.toLowerCase();
      const nameMatch = country.value.toLowerCase().includes(queryLower);
      const callingCodeMatch = country.calling_codes.some((code) =>
        code.toString().includes(query),
      );
      return nameMatch || callingCodeMatch;
    });
  }, [query]);

  const handleFilter = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const Countrie = useCallback(
    ({ countrie }: { countrie: ICountry }) => (
      <ActionsheetItem
        onPress={() => {
          setSelectCountry(countrie);
          handleClose();
        }}
      >
        <Text>{countrie.emoji}</Text>
        <ActionsheetItemText>{countrie.value}</ActionsheetItemText>
      </ActionsheetItem>
    ),
    [handleClose],
  );

  const getItemCount = (data: ICountry[]) => data.length;
  const getItem = (data: ICountry[], index: number) => data[index];

  return (
    <Actionsheet
      isOpen={showActionsheet}
      onClose={handleClose}
      snapPoints={[65]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios"
          ? "padding"
          : undefined}
        style={{
          position: "relative",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <ActionsheetBackdrop className="bg-black" />
        <ActionsheetContent className="h-[90%] z-50">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator className="bg-primary-500" />
          </ActionsheetDragIndicatorWrapper>

          <Input className="border-none" variant="underlined">
            <InputSlot className="pl-3">
              <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
              className="pl-3"
              placeholder="Rechercher un pays"
              onChangeText={handleFilter}
            />
          </Input>

          <ActionsheetVirtualizedList
            className="h-full mt-5"
            data={filteredCountries}
            initialNumToRender={20}
            renderItem={({ item }: any) => <Countrie countrie={item} />}
            keyExtractor={(item: any) => item.key}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </ActionsheetContent>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
};

export default ActionsheetCountries;