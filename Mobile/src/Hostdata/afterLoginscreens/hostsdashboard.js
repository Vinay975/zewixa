import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../userDetails/userAuth";
import { useNavigation } from "@react-navigation/native";

const COLORS = {
  primary: '#6846bd',
  primaryDark: '#5838a8',
  primaryLight: '#E8E3F3',
  dark: '#2D3436',
  gray: '#636E72',
  lightGray: '#DFE6E9',
  white: '#FFFFFF',
  background: '#F8F9FA',
  success: '#10B981',
  warning: '#F59E0B',
};

const HostDashBoard = () => {
  const { hostInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.hostName}>{hostInfo?.name || "Host"}</Text>
          </View>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={28} color={COLORS.primary} />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcons name="home-city" size={28} color={COLORS.white} />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Properties</Text>
          </View>

          <View style={[styles.statCard, styles.statCardSuccess]}>
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcons name="account-group" size={28} color={COLORS.white} />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tenants</Text>
          </View>
        </View>

        {/* Earnings Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <Text style={styles.earningsValue}>₹24,500</Text>
            </View>
            <View style={styles.earningsIconCircle}>
              <MaterialCommunityIcons name="currency-inr" size={32} color={COLORS.primary} />
            </View>
          </View>
          <View style={styles.earningsFooter}>
            <View style={styles.earningsItem}>
              <Text style={styles.earningsItemLabel}>This Month</Text>
              <Text style={styles.earningsItemValue}>₹8,500</Text>
            </View>
            <View style={styles.earningsDivider} />
            <View style={styles.earningsItem}>
              <Text style={styles.earningsItemLabel}>Pending</Text>
              <Text style={styles.earningsItemValue}>₹2,000</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("AboutPlace")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: COLORS.primaryLight }]}>
              <Ionicons name="add-circle" size={28} color={COLORS.primary} />
            </View>
            <Text style={styles.actionText}>Add Property</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate("EditPlace")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="create" size={28} color={COLORS.warning} />
            </View>
            <Text style={styles.actionText}>Edit Property</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
             onPress={() => navigation.navigate("ViewTenants")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="people" size={28} color={COLORS.success} />
            </View>
            <Text style={styles.actionText}>View Tenants</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
             onPress={() => navigation.navigate("Analytics")}
            activeOpacity={0.8}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="bar-chart" size={28} color="#3B82F6" />
            </View>
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityIconCircle}>
            <Ionicons name="time-outline" size={48} color={COLORS.lightGray} />
          </View>
          <Text style={styles.activityTitle}>No Recent Activity</Text>
          <Text style={styles.activityText}>
            Your recent bookings and payments will appear here
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </>
  );
};

export default HostDashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Welcome Section */
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: "500",
  },
  hostName: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.dark,
    marginTop: 4,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },

  /* Stats */
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  statCardPrimary: {
    backgroundColor: COLORS.primary,
  },
  statCardSuccess: {
    backgroundColor: COLORS.success,
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: "500",
    opacity: 0.9,
  },

  /* Earnings Card */
  earningsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  earningsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  earningsLabel: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: "500",
  },
  earningsValue: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.dark,
    marginTop: 4,
  },
  earningsIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  earningsFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  earningsItem: {
    flex: 1,
    alignItems: "center",
  },
  earningsItemLabel: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: "500",
  },
  earningsItemValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: 4,
  },
  earningsDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.lightGray,
  },

  /* Quick Actions */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  actionCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.dark,
    textAlign: "center",
  },

  /* Activity */
  activityCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 20,
  },

  bottomSpacer: {
    height: 24,
  },
});
