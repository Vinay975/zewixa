import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6846bd" barStyle="light-content" />
      
      {/* Header */}
     

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period.key && styles.periodTextActive,
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueCard}>
          <View style={styles.revenueHeader}>
            <View>
              <Text style={styles.revenueLabel}>Total Revenue</Text>
              <Text style={styles.revenueValue}>₹24,500</Text>
            </View>
            <View style={styles.revenueIconCircle}>
              <Ionicons name="trending-up" size={28} color="#10B981" />
            </View>
          </View>
          <View style={styles.revenueChange}>
            <Ionicons name="arrow-up" size={16} color="#10B981" />
            <Text style={styles.revenueChangeText}>+12.5% from last month</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: '#E8E3F3' }]}>
              <Ionicons name="home" size={24} color="#6846bd" />
            </View>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Properties</Text>
            <View style={styles.statChange}>
              <Ionicons name="arrow-up" size={12} color="#10B981" />
              <Text style={styles.statChangeText}>+1</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="people" size={24} color="#10B981" />
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Tenants</Text>
            <View style={styles.statChange}>
              <Ionicons name="arrow-up" size={12} color="#10B981" />
              <Text style={styles.statChangeText}>+3</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="cash" size={24} color="#EF4444" />
            </View>
            <Text style={styles.statValue}>₹2K</Text>
            <Text style={styles.statLabel}>Pending</Text>
            <View style={styles.statChange}>
              <Ionicons name="arrow-down" size={12} color="#EF4444" />
              <Text style={[styles.statChangeText, { color: '#EF4444' }]}>-5</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Occupancy</Text>
            <View style={styles.statChange}>
              <Ionicons name="arrow-up" size={12} color="#10B981" />
              <Text style={styles.statChangeText}>+2%</Text>
            </View>
          </View>
        </View>

        {/* Insights Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="trending-up" size={20} color="#10B981" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Revenue Growth</Text>
              <Text style={styles.insightText}>
                Your revenue increased by 12.5% this month
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="alert-circle" size={20} color="#F59E0B" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Pending Payments</Text>
              <Text style={styles.insightText}>
                2 tenants have pending payments worth ₹2,000
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#E8E3F3' }]}>
              <Ionicons name="star" size={20} color="#6846bd" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>High Occupancy</Text>
              <Text style={styles.insightText}>
                Your properties are 95% occupied this month
              </Text>
            </View>
          </View>
        </View>

        {/* Property Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Performance</Text>
          
          <View style={styles.propertyPerformanceCard}>
            <View style={styles.propertyPerformanceHeader}>
              <Text style={styles.propertyPerformanceName}>Sunrise Apartments</Text>
              <Text style={styles.propertyPerformanceRevenue}>₹12,500</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '85%', backgroundColor: '#6846bd' }]} />
            </View>
            <Text style={styles.propertyPerformanceOccupancy}>85% Occupancy</Text>
          </View>

          <View style={styles.propertyPerformanceCard}>
            <View style={styles.propertyPerformanceHeader}>
              <Text style={styles.propertyPerformanceName}>Green Valley Hostel</Text>
              <Text style={styles.propertyPerformanceRevenue}>₹8,000</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%', backgroundColor: '#10B981' }]} />
            </View>
            <Text style={styles.propertyPerformanceOccupancy}>100% Occupancy</Text>
          </View>

          <View style={styles.propertyPerformanceCard}>
            <View style={styles.propertyPerformanceHeader}>
              <Text style={styles.propertyPerformanceName}>Ocean View Residency</Text>
              <Text style={styles.propertyPerformanceRevenue}>₹4,000</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%', backgroundColor: '#F59E0B' }]} />
            </View>
            <Text style={styles.propertyPerformanceOccupancy}>60% Occupancy</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#6846bd',
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  periodSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  periodButtonActive: {
    backgroundColor: '#6846bd',
    borderColor: '#6846bd',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#636E72',
  },
  periodTextActive: {
    color: '#fff',
  },
  revenueCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  revenueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  revenueLabel: {
    fontSize: 14,
    color: '#636E72',
    fontWeight: '500',
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3436',
  },
  revenueIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revenueChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  revenueChangeText: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '600',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 12,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 13,
    color: '#636E72',
    lineHeight: 18,
  },
  propertyPerformanceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  propertyPerformanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyPerformanceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3436',
  },
  propertyPerformanceRevenue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6846bd',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  propertyPerformanceOccupancy: {
    fontSize: 12,
    color: '#636E72',
    fontWeight: '600',
  },
});
