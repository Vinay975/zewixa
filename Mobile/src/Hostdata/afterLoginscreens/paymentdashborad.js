import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  FlatList,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../userDetails/userAuth';
import { property1, property2, property3 } from './paymentinfo';

const PaymentDashboard = () => {
  const { hostInfo } = React.useContext(AuthContext);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [propertyData, setPropertyData] = useState({
    'Sunrise Apartments': property1,
    'Green Valley Hostel': property2,
    'Ocean View Residency': property3,
  });

  const transactions = [
    { id: 1, tenant: 'John Doe', property: 'Apartment 2B', amount: 8500, date: '2024-01-15', status: 'completed' },
    { id: 2, tenant: 'Sarah Smith', property: 'Hostel Room 5', amount: 3500, date: '2024-01-12', status: 'completed' },
    { id: 3, tenant: 'Mike Johnson', property: 'Apartment 1A', amount: 12000, date: '2024-01-10', status: 'pending' },
    { id: 4, tenant: 'Emma Wilson', property: 'Hostel Room 3', amount: 4000, date: '2024-01-08', status: 'completed' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Earnings Overview */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsLabel}>Total Balance</Text>
              <Text style={styles.earningsAmount}>₹20,000</Text>
            </View>
            <View style={styles.iconCircle}>
              <Ionicons name="wallet" size={28} color="#6846bd" />
            </View>
          </View>
          
          <View style={styles.earningsRow}>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsItemLabel}>This Month</Text>
              <Text style={styles.earningsItemValue}>₹18,00</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.earningsItem}>
              <Text style={styles.earningsItemLabel}>Pending</Text>
              <Text style={styles.earningsItemValuePending}>₹2,000</Text>
            </View>
          </View>
        </View>

        {/* Properties Dropdown Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Status of Each Property</Text>
          
          {Object.keys(propertyData).map((propertyName) => (
            <TouchableOpacity
              key={propertyName}
              style={styles.propertyDropdownItem}
              onPress={() => setSelectedProperty(propertyName)}
            >
              <Ionicons name="business" size={20} color="#6846bd" />
              <Text style={styles.propertyDropdownText}>{propertyName}</Text>
              <Ionicons name="chevron-forward" size={20} color="#636E72" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIconCircle}>
                  <Ionicons name="person" size={20} color="#6846bd" />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTenant}>{transaction.tenant}</Text>
                  <Text style={styles.transactionProperty}>{transaction.property}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    transaction.status === 'completed'
                      ? styles.statusCompleted
                      : styles.statusPending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      transaction.status === 'completed'
                        ? styles.statusTextCompleted
                        : styles.statusTextPending,
                    ]}
                  >
                    {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Property Detail Modal */}
      <Modal
        visible={selectedProperty !== null}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          {/* <StatusBar backgroundColor="#6846bd" barStyle="light-content" /> */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedProperty(null)}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedProperty}</Text>
            <View style={{ width: 24 }} />
          </View>

          {selectedProperty && (
            <ScrollView style={styles.modalContent}>
              {/* Stats Cards */}
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{propertyData[selectedProperty].length}</Text>
                  <Text style={styles.statLabel}>Total Strength</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
                  <Text style={[styles.statValue, { color: '#10B981' }]}>
                    {propertyData[selectedProperty].filter(t => t.paid).length}
                  </Text>
                  <Text style={styles.statLabel}>Paid</Text>
                </View>
                <View style={[styles.statCard, { backgroundColor: '#FEE2E2' }]}>
                  <Text style={[styles.statValue, { color: '#EF4444' }]}>
                    {propertyData[selectedProperty].filter(t => !t.paid).length}
                  </Text>
                  <Text style={styles.statLabel}>Unpaid</Text>
                </View>
              </View>

              {/* Visual Representation */}
              <Text style={styles.visualTitle}>Tenant Payment Status</Text>
              <View style={styles.tenantGrid}>
                {propertyData[selectedProperty].map((tenant) => (
                  <TouchableOpacity
                    key={tenant.id}
                    style={[
                      styles.tenantBox,
                      { backgroundColor: tenant.paid ? '#10B981' : '#EF4444' }
                    ]}
                    onPress={() => setSelectedTenant(tenant)}
                  >
                    <Text style={styles.tenantBoxText}>{tenant.id}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>

      {/* Tenant Detail Modal */}
      <Modal
        visible={selectedTenant !== null}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.tenantModalOverlay}>
          <View style={styles.tenantModalContent}>
            {selectedTenant && (
              <>
                {/* Top Section with Purple Background */}
                <View style={styles.modalTopSection}>
                  <TouchableOpacity
                    style={styles.closeButtonNew}
                    onPress={() => setSelectedTenant(null)}
                  >
                    <Ionicons name="close" size={24} color="#fff" />
                  </TouchableOpacity>
                  
                  <View style={styles.profileSection}>
                    <View style={styles.imageWrapper}>
                      <Image
                        source={{ uri: selectedTenant.profileImage }}
                        style={styles.tenantImageNew}
                      />
                      <View style={[
                        styles.statusDot,
                        { backgroundColor: selectedTenant.paid ? '#10B981' : '#EF4444' }
                      ]} />
                    </View>
                    <Text style={styles.tenantNameNew}>{selectedTenant.name}</Text>
                    <View style={styles.idBadge}>
                      <Text style={styles.idText}>ID: {selectedTenant.id}</Text>
                    </View>
                  </View>
                </View>

                {/* Bottom Section with White Background */}
                <View style={styles.modalBottomSection}>
                  {/* Phone Info */}
                  <View style={styles.detailRow}>
                    <View style={styles.detailIconBox}>
                      <Ionicons name="call-outline" size={24} color="#6846bd" />
                    </View>
                    <View style={styles.detailTextBox}>
                      <Text style={styles.detailLabel}>Phone Number</Text>
                      <Text style={styles.detailValue}>{selectedTenant.phone}</Text>
                    </View>
                  </View>

                  {/* Payment Status */}
                  <View style={styles.detailRow}>
                    <View style={[
                      styles.detailIconBox,
                      { backgroundColor: selectedTenant.paid ? '#D1FAE5' : '#FEE2E2' }
                    ]}>
                      <Ionicons 
                        name={selectedTenant.paid ? 'checkmark-circle-outline' : 'time-outline'} 
                        size={24} 
                        color={selectedTenant.paid ? '#10B981' : '#EF4444'} 
                      />
                    </View>
                    <View style={styles.detailTextBox}>
                      <Text style={styles.detailLabel}>Payment Status</Text>
                      <Text style={[
                        styles.detailValue,
                        { color: selectedTenant.paid ? '#10B981' : '#EF4444' }
                      ]}>
                        {selectedTenant.paid ? 'Completed' : 'Pending'}
                      </Text>
                    </View>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                      style={styles.callButtonNew}
                      onPress={() => Linking.openURL(`tel:${selectedTenant.phone}`)}
                    >
                      <Ionicons name="call" size={20} color="#fff" />
                      <Text style={styles.buttonTextNew}>Call Now</Text>
                    </TouchableOpacity>

                    {!selectedTenant.paid && (
                      <TouchableOpacity
                        style={styles.markPaidButtonNew}
                        onPress={() => {
                          const updatedData = { ...propertyData };
                          const propertyKey = Object.keys(updatedData).find(key => 
                            updatedData[key].some(t => t.id === selectedTenant.id)
                          );
                          const tenantIndex = updatedData[propertyKey].findIndex(
                            t => t.id === selectedTenant.id
                          );
                          updatedData[propertyKey][tenantIndex].paid = true;
                          setPropertyData(updatedData);
                          setSelectedTenant({ ...selectedTenant, paid: true });
                        }}
                      >
                        <Ionicons name="checkmark-circle" size={20} color="#fff" />
                        <Text style={styles.buttonTextNew}>Mark as Paid</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaymentDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 50,
  },
  earningsCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  earningsLabel: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 4,
  },
  earningsAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3436',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8E3F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earningsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  earningsItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  earningsItemLabel: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 4,
  },
  earningsItemValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10B981',
  },
  earningsItemValuePending: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F59E0B',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  propertyDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  propertyDropdownText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3436',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#6846bd',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    // color: '#fff',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '600',
  },
  visualTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  tenantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tenantBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  tenantBoxText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  transactionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8E3F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTenant: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 2,
  },
  transactionProperty: {
    fontSize: 13,
    color: '#636E72',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextCompleted: {
    color: '#10B981',
  },
  statusTextPending: {
    color: '#F59E0B',
  },
  tenantModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tenantModalContent: {
    backgroundColor: '#fff',
    borderRadius: 28,
    width: '92%',
    maxHeight: '85%',
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
  },
  modalTopSection: {
    backgroundColor: '#6846bd',
    paddingTop: 20,
    paddingBottom: 30,
    position: 'relative',
  },
  closeButtonNew: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  tenantImageNew: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: '#fff',
  },
  statusDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: '#6846bd',
  },
  tenantNameNew: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  idBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  idText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  modalBottomSection: {
    padding: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  detailIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8E3F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailTextBox: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 17,
    color: '#2D3436',
    fontWeight: '700',
  },
  buttonContainer: {
    marginTop: 8,
    gap: 12,
  },
  callButtonNew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6846bd',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    elevation: 4,
    shadowColor: '#6846bd',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  markPaidButtonNew: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    elevation: 4,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  buttonTextNew: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
