import React from 'react';
import {
    View, Text, Image, ScrollView, StyleSheet,
    TouchableOpacity, Linking
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ApartmentDetails({ route }) {
    const { apartment } = route.params;

    const photo = (key) =>
        apartment.photos?.[key]
            ? `https://myapp-5u6v.onrender.com${apartment.photos[key]}`
            : null;

    const profilePhoto = apartment.ownerData?.profileImage
        ? `https://myapp-5u6v.onrender.com${apartment.ownerData.profileImage}`
        : null;

    const openDialer = () => {
        if (apartment.ownerData?.mobile1) {
            Linking.openURL(`tel:${apartment.ownerData.mobile1}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Owner Info */}
            <View style={styles.ownerRow}>
                {profilePhoto && <Image
                    source={{ uri: apartment.ownerData?.profileImage }}
                    style={styles.ownerImage}
                />}
                <View style={styles.ownerDetails}>
                    <Text style={styles.ownerName}>Name: {apartment.ownerData?.name}</Text>
                    <Text style={styles.ownerDetail}>Email: {apartment.ownerData?.email}</Text>
                    <Text style={styles.ownerDetail}>Phone 1: {apartment.ownerData?.mobile1}</Text>
                    <Text style={styles.ownerDetail}>Phone 2: {apartment.ownerData?.mobile2}</Text>
                    <Text style={styles.ownerDetail}>Location : {apartment.location || 'N/A'}</Text>
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



            {/* Rent Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rent Details</Text>
                <View style={styles.rentCard}>
                    {(apartment.bhkUnits || []).map((unit, index) => (
                        <View style={styles.rentRow} key={index}>
                            <Text style={styles.rentText}>
                                {unit.apartmentType}: ₹{unit.monthlyRent} | Deposit: ₹{unit.securityDeposit} | Maintenance: ₹{unit.maintenanceCharges}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* WiFi */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>WiFi</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="wifi" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>
                        {apartment.wifiAvailable === 'yes' ? 'Available' : 'Not Available'}
                    </Text>
                </View>
            </View>

            {/* Electricity */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Electricity</Text>
                <View style={styles.infoRow}>
                    <Ionicons name="flash-outline" size={20} color="#6846bd" />
                    <Text style={styles.infoText}>
                        Electricity Included: {apartment.isElectricityIncluded === 'yes' ? 'Yes' : 'No'}
                    </Text>
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

            {/* Call & Book Buttons */}
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
        borderWidth: 1,
        borderColor: '#eee',
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
        marginBottom: 20,
        paddingHorizontal: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        color: "#333",
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
        backgroundColor: "#f8f8fc",
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rentRow: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },

    rentText: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
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
