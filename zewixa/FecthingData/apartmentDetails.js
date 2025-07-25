import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ApartmentDetails({ route }) {
    const { apartment } = route.params;

    const photo = (key) =>
        apartment.photos?.[key]
            ? `https://myapp-kida.onrender.com${apartment.photos[key]}`    
            : null;

    const profilePhoto = apartment.ownerData?.profileImage
        ? `https://myapp-kida.onrender.com${apartment.ownerPhoto}`
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
                        <Ionicons name="person-circle" size={20} color="#6846bd" /> {apartment.ownerName}
                    </Text>
                    <Text style={styles.ownerDetail}>📧 {apartment.ownerEmail}</Text>
                    <Text style={styles.ownerDetail}>📞 {apartment.ownerMobile}</Text>
                    <Text style={styles.ownerDetail}>📞 {apartment.ownerMobile2}</Text>
                </View>
            </View>

            {/* Apartment Photos */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Photos</Text>
                <View style={styles.photoGrid}>
                    {['building', 'livingRoom', 'kitchen', 'bedroom', 'bathroom', 'balcony'].map((key) =>
                        photo(key) ? (
                            <Image key={key} source={{ uri: photo(key) }} style={styles.gridImage} />
                        ) : null
                    )}
                </View>
            </View>

            {/* Rent Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rent Details</Text>
                <View style={styles.rentCard}>
                    {Object.entries(apartment.rent || {}).map(([type, value]) => (
                        <View style={styles.rentRow} key={type}>
                            <FontAwesome5 name="rupee-sign" size={16} color="#6846bd" />
                            <Text style={styles.rentText}>{type}: ₹{value}</Text>
                        </View>
                    ))}
                    <View style={styles.rentRow}>
                        <MaterialCommunityIcons name="cash-refund" size={18} color="#6846bd" />
                        <Text style={styles.rentText}>Advance: ₹{apartment.advancePayment}</Text>
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
    container: { padding: 16, backgroundColor: '#fff' },
    ownerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    ownerImage: { width: 70, height: 70, borderRadius: 35, marginRight: 12, backgroundColor: 'red', },
    ownerDetails: { flex: 1 },
    ownerName: { fontSize: 18, fontWeight: 'bold', color: '#6846bd' },
    ownerDetail: { fontSize: 14, color: '#444', marginTop: 2 },

    section: { marginTop: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#6846bd' },

    photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    gridImage: {
        width: '48%',
        height: 150,
        marginBottom: 8,
        borderRadius: 10
    },

    rentCard: {
        backgroundColor: '#f8f6ff',
        padding: 12,
        borderRadius: 8,
        elevation: 2
    },
    rentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    rentText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333'
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    infoText: {
        marginLeft: 8,
        fontSize: 15,
        color: '#333'
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        gap: 10
    },
    callBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6846bd',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center'
    },
    bookBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'tomato',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center'
    },
    btnText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        gap: 10,
        marginBottom: 40, // Ensures not cut off
        paddingBottom: 20,
    },

});
