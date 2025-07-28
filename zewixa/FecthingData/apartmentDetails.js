import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ApartmentDetails({ route }) {
    const { apartment } = route.params;

    const photo = (key) =>
        apartment.photos?.[key]
            ? `https://myapp-5u6v.onrender.com${apartment.photos[key]}`
            : null;

    const profilePhoto = apartment.ownerPhoto
        ? `https://myapp-5u6v.onrender.com${apartment.ownerPhoto}`
        : null;


    const openDialer = () => {
        if (apartment.ownerData?.mobile1) {
            Linking.openURL(`tel:${apartment.ownerMobile}`);
        }
    };
    // console.log("Owner Image Path:", apartment.ownerData?.profileImage);


    return (
        <ScrollView style={styles.container}>
            {/* Owner Info */}
            <View style={styles.ownerRow}>
                {profilePhoto && <Image source={{ uri: profilePhoto }} style={styles.ownerImage} />}
                <View style={styles.ownerDetails}>
                    <Text style={styles.ownerName}>
                       Name : {apartment.ownerName}
                    </Text>
                    <Text style={styles.ownerDetail}>Email : {apartment.ownerEmail}</Text>
                    <Text style={styles.ownerDetail}>phn : {apartment.ownerMobile1}</Text>
                    <Text style={styles.ownerDetail}>phn :  {apartment.ownerMobile2}</Text>
                </View>
            </View>

            {/* Apartment Photos */}
            <View style={styles.photoGrid}>
                {[
                    ['building', 'Building'],
                    ['livingRoom', 'Living Room'],
                    ['kitchen', 'Kitchen'],
                    ['bedroom', 'Bedroom'],
                    ['bathroom', 'Bathroom'],
                    ['balcony', 'Balcony'],
                ].map(([key, label]) =>
                    photo(key) ? (
                        <View key={key} style={styles.photoWrapper}>
                            <Image source={{ uri: photo(key) }} style={styles.gridImage} />
                            <Text style={styles.photoLabel}>{label}</Text>
                        </View>
                    ) : null
                )}
            </View>


            {/* Rent Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rent Details</Text>

                <View style={styles.rentCard}>
                    {/* Sharing Rents */}
                    {/* <Text style={styles.rentHeading}>Per Month Rent</Text> */}
                    {Object.entries(apartment.rent || {}).map(([type, value]) => {
                        const labelMap = {
                            oneSharing: "One Sharing",
                            twoSharing: "Two Sharing",
                            threeSharing: "Three Sharing",
                            fourSharing: "Four Sharing",
                        };

                        if (type === "advance") return null; // skip advance for now

                        return (
                            <View style={styles.rentRow} key={type}>
                                <Text style={styles.rentText}>{labelMap[type] || type}: ₹{value}</Text>
                            </View>
                        );
                    })}

                    {/* Advance Payment */}
                    <View style={styles.rentRow}>
                        <Text style={styles.rentText}>Advance to pay: ₹{apartment.rent?.advance || "N/A"}</Text>
                    </View>
                </View>
            </View>


            {/* WiFi */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>WiFi</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="wifi" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>{apartment.wifiAvailable ? 'Available' : 'Not Available'}</Text>
                </View>
            </View>

            {/* Security Info */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Security Features</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="videocam" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>CCTV: {apartment.security?.cctv ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="security" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>Security Guards: {apartment.security?.securityGuards ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="home" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>Gated Community: {apartment.security?.gatedCommunity ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="fire" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>Fire Safety: {apartment.security?.fireSafety ? 'Yes' : 'No'}</Text>
                </View>
            </View>

            {/* Call and Book Buttons */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={openDialer} style={styles.callBtn}>
                    <Ionicons name="call" size={20} color="#fff" />
                    <Text style={styles.btnText}>Call Owner</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookBtn}>
                    <Ionicons name="calendar" size={20} color="#fff" />
                    <Text style={styles.btnText}>Book Apartment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fdfdfd',
    },
    ownerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 3,
        height: 170,
    },
    ownerImage: {
        width: 110,
        height: 110,
        borderRadius: 50,
        marginRight: 16,
        borderWidth: 2,
        borderColor: '#cbcacd0b',
        backgroundColor: '#eee',
        elevation: 3,
    },
    ownerDetails: {
        flex: 1,
    },
    ownerName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    ownerDetail: {
        fontSize: 15,
        color: '#555',
        marginBottom: 4,
    },

    section: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        elevation: 2,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        // color: '#6846bd',
        marginBottom: 12,
    },

    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    photoWrapper: {
        width: '48%',
        marginBottom: 12,
    },
    gridImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    photoLabel: {
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '600',
        fontSize: 14,
        color: '#444',
    },

    rentCard: {
        backgroundColor: '#f8f6ff',
        padding: 12,
        borderRadius: 8,
        elevation: 2,
    },
    rentHeading: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
        marginTop: 10,
    },

    rentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rentText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
        marginBottom: 30,
    },
    callBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6846bd',
        padding: 12,
        borderRadius: 30,
        paddingHorizontal: 30,
    },
    bookBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'tomato',
        padding: 12,
        borderRadius: 30,
        paddingHorizontal: 30,
    },
    btnText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
});
