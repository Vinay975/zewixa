import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { property1, property2, property3 } from '../afterLoginscreens/paymentinfo';

const ViewTenants = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyData] = useState({
    'Sunrise Apartments': property1,
    'Green Valley Hostel': property2,
    'Ocean View Residency': property3,
  });

  const renderPropertyList = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>View Tenants</Text>
        <Text style={styles.headerSubtitle}>Select a property to view tenants</Text>
      </View>

      <View style={styles.propertyList}>
        {Object.keys(propertyData).map((propertyName) => {
          const tenants = propertyData[propertyName];
          const paidCount = tenants.filter(t => t.paid).length;
          const unpaidCount = tenants.length - paidCount;

          return (
            <TouchableOpacity
              key={propertyName}
              style={styles.propertyCard}
              onPress={() => setSelectedProperty(propertyName)}
              activeOpacity={0.7}
            >
              <View style={styles.propertyIconCircle}>
                <Ionicons name="business" size={28} color="#6846bd" />
              </View>
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyName}>{propertyName}</Text>
                <View style={styles.propertyStats}>
                  <View style={styles.statBadge}>
                    <Ionicons name="people" size={14} color="#636E72" />
                    <Text style={styles.statText}>{tenants.length} Total</Text>
                  </View>
                  <View style={[styles.statBadge, { backgroundColor: '#D1FAE5' }]}>
                    <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                    <Text style={[styles.statText, { color: '#10B981' }]}>{paidCount} Paid</Text>
                  </View>
                  <View style={[styles.statBadge, { backgroundColor: '#FEE2E2' }]}>
                    <Ionicons name="close-circle" size={14} color="#EF4444" />
                    <Text style={[styles.statText, { color: '#EF4444' }]}>{unpaidCount} Unpaid</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#636E72" />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );

  const renderTenantList = () => {
    const tenants = propertyData[selectedProperty];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#6846bd" barStyle="light-content" />
        <View style={styles.tenantHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedProperty(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.tenantHeaderContent}>
            <Text style={styles.tenantHeaderTitle}>{selectedProperty}</Text>
            <Text style={styles.tenantHeaderSubtitle}>{tenants.length} Tenants</Text>
          </View>
        </View>

        <ScrollView style={styles.tenantList} showsVerticalScrollIndicator={false}>
          {tenants.map((tenant) => (
            <View key={tenant.id} style={styles.tenantCard}>
              <Image
                source={{ uri: tenant.profileImage }}
                style={styles.tenantAvatar}
              />
              <View style={styles.tenantInfo}>
                <View style={styles.tenantNameRow}>
                  <Text style={styles.tenantName}>{tenant.name}</Text>
                  <View style={[
                    styles.paymentBadge,
                    { backgroundColor: tenant.paid ? '#D1FAE5' : '#FEE2E2' }
                  ]}>
                    <Text style={[
                      styles.paymentBadgeText,
                      { color: tenant.paid ? '#10B981' : '#EF4444' }
                    ]}>
                      {tenant.paid ? 'Paid' : 'Unpaid'}
                    </Text>
                  </View>
                </View>
                <View style={styles.tenantDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="card-outline" size={16} color="#636E72" />
                    <Text style={styles.detailText}>ID: {tenant.id}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="call-outline" size={16} color="#636E72" />
                    <Text style={styles.detailText}>{tenant.phone}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Linking.openURL(`tel:${tenant.phone}`)}
              >
                <Ionicons name="call" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return selectedProperty ? renderTenantList() : renderPropertyList();
};

export default ViewTenants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
  },
  propertyList: {
    padding: 16,
  },
  propertyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  propertyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8E3F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 8,
  },
  propertyStats: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#636E72',
  },
  tenantHeader: {
    backgroundColor: '#6846bd',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tenantHeaderContent: {
    flex: 1,
  },
  tenantHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  tenantHeaderSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  tenantList: {
    flex: 1,
    padding: 16,
  },
  tenantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tenantAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#E8E3F3',
  },
  tenantInfo: {
    flex: 1,
  },
  tenantNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tenantName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    flex: 1,
  },
  paymentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  tenantDetails: {
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#636E72',
    fontWeight: '500',
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6846bd',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    elevation: 3,
    shadowColor: '#6846bd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
