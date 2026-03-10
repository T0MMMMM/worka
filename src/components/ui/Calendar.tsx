import { useTheme } from "@/src/hooks/useTheme";
import moment from "moment";
import "moment/locale/fr";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

moment.locale("fr");

export const Calendar = ({
  selectedDate,
  onDateSelected,
}: {
  selectedDate: moment.Moment;
  onDateSelected: (date: moment.Moment) => void;
}) => {
  const { colors, fonts } = useTheme();

  const dates = useMemo(() => {
    const start = moment().subtract(7, "days");
    return Array.from({ length: 30 }).map((_, i) => moment(start).add(i, "days"));
  }, []);

  const renderItem = ({ item }: { item: moment.Moment }) => {
    const isSelected = item.isSame(selectedDate, "day");
    const dayLetter = item.format("dddd").substring(0, 1).toUpperCase();
    const dayNumber = item.date();

    return (
      <TouchableOpacity
        onPress={() => onDateSelected(item)}
        style={styles.dayContainer}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.dayName,
            { color: colors.textMuted, fontFamily: fonts.bold },
            isSelected && { color: colors.accent },
          ]}
        >
          {dayLetter}
        </Text>
        <View
          style={[
            styles.numberWrapper,
            isSelected && { backgroundColor: colors.accent },
          ]}
        >
          <Text
            style={[
              styles.dayNumber,
              { color: colors.textSecondary, fontFamily: fonts.bold },
              isSelected && styles.selectedDayNumber,
            ]}
          >
            {dayNumber}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dates}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toISOString()}
        contentContainerStyle={styles.listContent}
        initialScrollIndex={7}
        snapToInterval={60}
        decelerationRate="fast"
        getItemLayout={(_, index) => ({ length: 60, offset: 60 * index, index })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
    width: 60,
  },
  dayName: {
    fontSize: 13,
    marginBottom: 8,
  },
  numberWrapper: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
  },
  dayNumber: {
    fontSize: 18,
  },
  selectedDayNumber: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});
