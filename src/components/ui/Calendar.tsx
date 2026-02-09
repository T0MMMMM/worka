import { theme } from "@/src/constants/theme";
import moment from 'moment';
import 'moment/locale/fr';
import React, { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

moment.locale('fr');

export const Calendar = ({ selectedDate, onDateSelected }: { selectedDate: moment.Moment; onDateSelected: (date: moment.Moment) => void }) => {

    // Génère 14 jours (semaine dernière + semaine prochaine)
    const dates = useMemo(() => {
        const start = moment().subtract(7, 'days');
        return Array.from({ length: 30 }).map((_, i) => moment(start).add(i, 'days'));
    }, []);

    const renderItem = ({ item }: { item: moment.Moment }) => {
        const isSelected = item.isSame(selectedDate, 'day');
        const dayLetter = item.format('dddd').substring(0, 1).toUpperCase();
        const dayNumber = item.date();

        return (
            <TouchableOpacity
                onPress={() => onDateSelected(item)}
                style={styles.dayComponentContainer}
                activeOpacity={0.8}
            >
                <Text style={[styles.dateName, isSelected && styles.selectedDateName]}>
                    {dayLetter}
                </Text>
                <View style={[styles.numberWrapper, isSelected && styles.highlightCircle]}>
                    <Text style={[styles.dateNumber, isSelected && styles.selectedDateNumber]}>
                        {dayNumber}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.calendarContainer}>
            <FlatList
                data={dates}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.toISOString()}
                contentContainerStyle={styles.listContent}
                initialScrollIndex={7} // Centre sur aujourd'hui
                snapToInterval={60} // Snap to each day
                decelerationRate="fast"
                getItemLayout={(_, index) => ({
                    length: 60,
                    offset: 60 * index,
                    index,
                })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        height: 100,
        marginTop: 10,
    },
    listContent: {
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    dayComponentContainer: {
        alignItems: 'center',
        width: 60, // Espace fixe pour chaque jour
    },
    dateName: {
        color: '#808080',
        fontSize: 13,
        fontFamily: theme.fonts.urbanistBold,
        marginBottom: 8,
    },
    selectedDateName: {
        color: theme.colors.onPrimary,
        fontFamily: theme.fonts.urbanistBold,
    },
    numberWrapper: {
        width: 46,
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlightCircle: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    dateNumber: {
        color: '#808080',
        fontSize: 18,
        fontFamily: theme.fonts.urbanistBold,
    },
    selectedDateNumber: {
        fontSize: 22,
        color: theme.colors.onPrimary,
        fontFamily: theme.fonts.urbanistBold,
    },
});