// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   Modal,
//   Image,
//   Linking,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const PropertyDetailScreen = ({ route, navigation }) => {
//   const { propertyName, tenants, propertyData, setPropertyData } = route.params;
//   const [selectedTenant, setSelectedTenant] = useState(null);

//   const paidCount = tenants.filter(t => t.paid).length;
//   const unpaidCount = tenants.length - paidCount;

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#6846bd" barStyle="light-content" />
      
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Stats Cards */}
//         <View style={styles.statsRow}>
//           <View style={styles.statCard}>
//             <Text style={styles.statValue}>{tenants.length}</Text>
//             <Text style={styles.statLabel}>Total Strength</Text>
//           </View>
//           <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
//             <Text style={[styles.statValue, { color: '#10B981' }]}>{paidCount}</Text>
//             <Text style={styles.statLabel}>Paid</Text>
//           </View>
//           <View style={[styles.statCard, { backgroundColor: '#FEE2E2' }]}>
//             <Text style={[styles.statValue, { color: '#EF4444' }]}>{unpaidCount}</Text>
//             <Text style={styles.statLabel}>Unpaid</Text>
//           </View>
//         </View>

//         {/* Visual Representation */}
//         <View style={styles.section}>
//           <Text style={styles.visualTitle}>Tenant Payment Status</Text>
//           <View style={styles.tenantGrid}>
//             {tenants.map((tenant) => (
//               <TouchableOpacity
//                 key={tenant.id}
//                 style={[
//                   styles.tenantBox,
//                   { backgroundColor: tenant.paid ? '#10B981' : '#EF4444' }
//                 ]}
//                 onPress={() => setSelectedTenant(tenant)}
//               >
//                 <Ionicons 
//                   name={tenant.paid ? 'checkmark-circle' : 'close-circle'} 
//                   size={24} 
//                   color="#fff" 
//                 />
//                 <Text style={styles.tenantBoxText}>{tenant.id}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Tenant Detail Modal */}
//       <Modal
//         visible={selectedTenant !== null}
//         animationType="slide"
//         transparent={true}
//       >
//         <View style={styles.tenantModalOverlay}>
//           <View style={styles.tenantModalContent}>
//             {selectedTenant && (
//               <>
//                 {/* Top Section with Gradient Background */}
//                 <View style={styles.modalTopSection}>
//                   <TouchableOpacity
//                     style={styles.closeButtonNew}
//                     onPress={() => setSelectedTenant(null)}
//                   >
//                     <Ionicons name="close" size={24} color="#fff" />
//                   </TouchableOpacity>
                  
//                   <View style={styles.profileSection}>
//                     <View style={styles.imageWrapper}>
//                       <Image
//                         source={{ uri: selectedTenant.profileImage }}
//                         style={styles.tenantImageNew}
//                       />
//                       <View style={[
//                         styles.statusDot,
//                         { backgroundColor: selectedTenant.paid ? '#10B981' : '#EF4444' }
//                       ]} />
//                     </View>
//                     <Text style={styles.tenantNameNew}>{selectedTenant.name}</Text>
//                     <View style={styles.idBadge}>
//                       <Text style={styles.idText}>ID: {selectedTenant.id}</Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* Bottom Section with White Background */}
//                 <View style={styles.modalBottomSection}>
//                   {/* Phone Info */}
//                   <View style={styles.detailRow}>
//                     <View style={styles.detailIconBox}>
//                       <Ionicons name="call-outline" size={24} color="#6846bd" />
//                     </View>
//                     <View style={styles.detailTextBox}>
//                       <Text style={styles.detailLabel}>Phone Number</Text>
//                       <Text style={styles.detailValue}>{selectedTenant.phone}</Text>
//                     </View>
//                   </View>

//                   {/* Payment Status */}
//                   <View style={styles.detailRow}>
//                     <View style={[
//                       styles.detailIconBox,
//                       { backgroundColor: selectedTenant.paid ? '#D1FAE5' : '#FEE2E2' }
//                     ]}>
//                       <Ionicons 
//                         name={selectedTenant.paid ? 'checkmark-circle-outline' : 'time-outline'} 
//                         size={24} 
//                         color={selectedTenant.paid ? '#10B981' : '#EF4444'} 
//                       />
//                     </View>
//                     <View style={styles.detailTextBox}>
//                       <Text style={styles.detailLabel}>Payment Status</Text>
//                       <Text style={[
//                         styles.detailValue,
//                         { color: selectedTenant.paid ? '#10B981' : '#EF4444' }
//                       ]}>
//                         {selectedTenant.paid ? 'Completed' : 'Pending'}
//                       </Text>
//                     </View>
//                   </View>

//                   {/* Action Buttons */}
//                   <View style={styles.buttonContainer}>
//                     <TouchableOpacity 
//                       style={styles.callButtonNew}
//                       onPress={() => Linking.openURL(`tel:${selectedTenant.phone}`)}
//                     >
//                       <Ionicons name="call" size={20} color="#fff" />
//                       <Text style={styles.buttonTextNew}>Call Now</Text>
//                     </TouchableOpacity>

//                     {!selectedTenant.paid && (
//                       <TouchableOpacity
//                         style={styles.markPaidButtonNew}
//                         onPress={() => {
//                           const updatedData = { ...propertyData };
//                           const tenantIndex = updatedData[propertyName].findIndex(
//                             t => t.id === selectedTenant.id
//                           );
//                           updatedData[propertyName][tenantIndex].paid = true;
//                           setPropertyData(updatedData);
//                           setSelectedTenant({ ...selectedTenant, paid: true });
//                         }}
//                       >
//                         <Ionicons name="checkmark-circle" size={20} color="#fff" />
//                         <Text style={styles.buttonTextNew}>Mark as Paid</Text>
//                       </TouchableOpacity>
//                     )}
//                   </View>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default PropertyDetailScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FA',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     gap: 12,
//     padding: 16,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   statValue: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#2D3436',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#636E72',
//     fontWeight: '600',
//   },
//   section: {
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   visualTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#2D3436',
//     marginBottom: 12,
//   },
//   tenantGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//   },
//   tenantBox: {
//     width: 70,
//     height: 70,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   tenantBoxText: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '700',
//     marginTop: 4,
//   },
//   tenantModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tenantModalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 28,
//     width: '92%',
//     maxHeight: '85%',
//     overflow: 'hidden',
//     elevation: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.4,
//     shadowRadius: 30,
//   },
//   modalTopSection: {
//     backgroundColor: '#6846bd',
//     paddingTop: 20,
//     paddingBottom: 30,
//     position: 'relative',
//   },
//   closeButtonNew: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     zIndex: 10,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileSection: {
//     alignItems: 'center',
//     paddingTop: 10,
//   },
//   imageWrapper: {
//     position: 'relative',
//     marginBottom: 16,
//   },
//   tenantImageNew: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     borderWidth: 5,
//     borderColor: '#fff',
//   },
//   statusDot: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     borderWidth: 4,
//     borderColor: '#6846bd',
//   },
//   tenantNameNew: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   idBadge: {
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   idText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '700',
//   },
//   modalBottomSection: {
//     padding: 24,
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F8F9FA',
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 12,
//   },
//   detailIconBox: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#E8E3F3',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 16,
//   },
//   detailTextBox: {
//     flex: 1,
//   },
//   detailLabel: {
//     fontSize: 12,
//     color: '#636E72',
//     fontWeight: '600',
//     marginBottom: 4,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   detailValue: {
//     fontSize: 17,
//     color: '#2D3436',
//     fontWeight: '700',
//   },
//   buttonContainer: {
//     marginTop: 8,
//     gap: 12,
//   },
//   callButtonNew: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#6846bd',
//     paddingVertical: 16,
//     borderRadius: 14,
//     gap: 10,
//     elevation: 4,
//     shadowColor: '#6846bd',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//   },
//   markPaidButtonNew: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#10B981',
//     paddingVertical: 16,
//     borderRadius: 14,
//     gap: 10,
//     elevation: 4,
//     shadowColor: '#10B981',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//   },
//   buttonTextNew: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '800',
//     letterSpacing: 0.5,
//   },
// });
