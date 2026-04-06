import { useTheme } from "@/src/hooks/useTheme";
import moment from "moment";
import "moment/locale/fr";
import React, { useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

moment.locale("fr");

const DAYS_VISIBLE = 7;

export interface CalendarRef {
  scrollToDate: (date: moment.Moment, animated?: boolean) => void;
}

interface CalendarProps {
  selectedDate: moment.Moment;
  onDateSelected: (date: moment.Moment) => void;
}

export const Calendar = React.forwardRef<CalendarRef, CalendarProps>(
  ({ selectedDate, onDateSelected }, ref) => {
    const { colors, fonts } = useTheme();
    const { width: screenWidth } = useWindowDimensions();
    const listRef = useRef<FlatList>(null);
    const today = useRef(moment().startOf("day")).current;

    const DAY_W = screenWidth / DAYS_VISIBLE;

    // 8 months of week-aligned (Mon–Sun) days, computed once on mount
    const allDays = useMemo<moment.Moment[]>(() => {
      const days: moment.Moment[] = [];
      const start = moment(today).subtract(4, "months").startOf("isoWeek");
      const end = moment(today).add(4, "months").endOf("isoWeek");
      let cur = moment(start);
      while (cur.isSameOrBefore(end, "day")) {
        days.push(moment(cur));
        cur.add(1, "day");
      }
      return days;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getWeekOffset = (date: moment.Moment) => {
      const idx = allDays.findIndex((d) => d.isSame(date, "day"));
      if (idx < 0) return 0;
      return Math.floor(idx / 7) * DAY_W * 7;
    };

    const scrollToDate = (date: moment.Moment, animated = true) => {
      const offset = getWeekOffset(date);
      setTimeout(() => {
        listRef.current?.scrollToOffset({ offset, animated });
      }, 50);
    };

    useImperativeHandle(ref, () => ({ scrollToDate }));

    // Scroll to the week of selectedDate on mount
    useEffect(() => {
      scrollToDate(selectedDate, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getItemLayout = (_: any, index: number) => ({
      length: DAY_W,
      offset: DAY_W * index,
      index,
    });

    const renderDay = ({ item: date }: { item: moment.Moment }) => {
      const isSelected = date.isSame(selectedDate, "day");
      const isToday = date.isSame(today, "day");
      const dayLetter = date.format("dddd").substring(0, 1).toUpperCase();

      return (
        <TouchableOpacity
          onPress={() => onDateSelected(date)}
          style={[styles.dayContainer, { width: DAY_W }]}
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
              !isSelected && isToday && { borderWidth: 1.5, borderColor: colors.accent },
            ]}
          >
            <Text
              style={[
                styles.dayNumber,
                { color: colors.textSecondary, fontFamily: fonts.bold },
                isSelected && styles.selectedDayNumber,
                isToday && !isSelected && { color: colors.accent },
              ]}
            >
              {date.date()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={allDays}
          renderItem={renderDay}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(date) => date.toISOString()}
          snapToInterval={DAY_W * 7}
          decelerationRate="fast"
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={() => {}}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginTop: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  dayName: {
    fontSize: 12,
    marginBottom: 7,
  },
  numberWrapper: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  dayNumber: {
    fontSize: 16,
  },
  selectedDayNumber: {
    fontSize: 17,
    color: "#FFFFFF",
  },
});
