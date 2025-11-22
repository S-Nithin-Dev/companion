// ============================================
// EarningsScreen.js
// View earnings and payment history
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function EarningsScreen({ navigation }) {

  // ============================================
  // MOCK DATA
  // ============================================

  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const earningsData = {
    thisMonth: 2400,
    lastMonth: 1800,
    total: 12500,
    pending: 600,
  };

  const transactions = [
    {
      id: '1',
      date: 'Dec 15, 2024',
      activity: 'Coffee Chat',
      client: 'Amit K.',
      amount: 400,
      status: 'completed',
    },
    {
      id: '2',
      date: 'Dec 14, 2024',
      activity: 'City Walk',
      client: 'Priya M.',
      amount: 600,
      status: 'completed',
    },
    {
      id: '3',
      date: 'Dec 12, 2024',
      activity: 'Lunch',
      client: 'Rahul S.',
      amount: 800,
      status: 'pending',
    },
    {
      id: '4',
      date: 'Dec 10, 2024',
      activity: 'Coffee Chat',
      client: 'Sneha R.',
      amount: 600,
      status: 'completed',
    },
  ];

  // ============================================
  // RENDER
  // ============================================

  return (
    <LinearGradient
      colors={['#FDF1F8', '#FFF9F5', '#F3E9FF']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Safe area */}
        <View style={styles.safeArea} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Earnings</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Total Earnings Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>This Month</Text>
          <Text style={styles.totalAmount}>₹{earningsData.thisMonth}</Text>
          <View style={styles.totalStats}>
            <View style={styles.totalStat}>
              <Text style={styles.statLabel}>Last Month</Text>
              <Text style={styles.statValue}>₹{earningsData.lastMonth}</Text>
            </View>
            <View style={styles.totalStatDivider} />
            <View style={styles.totalStat}>
              <Text style={styles.statLabel}>All Time</Text>
              <Text style={styles.statValue}>₹{earningsData.total}</Text>
            </View>
          </View>
        </View>

        {/* Pending Payout */}
        {earningsData.pending > 0 && (
          <View style={styles.pendingCard}>
            <View style={styles.pendingInfo}>
              <Text style={styles.pendingLabel}>Pending Payout</Text>
              <Text style={styles.pendingAmount}>₹{earningsData.pending}</Text>
            </View>
            <Text style={styles.pendingNote}>
              Payments are processed within 24 hours
            </Text>
          </View>
        )}

        {/* Period Filter */}
        <View style={styles.periodFilter}>
          {['week', 'month', 'year'].map(period => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period && styles.periodTextActive,
              ]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionsCard}>
            {transactions.map((transaction, index) => (
              <View
                key={transaction.id}
                style={[
                  styles.transactionRow,
                  index === transactions.length - 1 && styles.lastRow,
                ]}
              >
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionActivity}>
                    {transaction.activity}
                  </Text>
                  <Text style={styles.transactionClient}>
                    {transaction.client} • {transaction.date}
                  </Text>
                </View>
                <View style={styles.transactionAmountContainer}>
                  <Text style={styles.transactionAmount}>
                    +₹{transaction.amount}
                  </Text>
                  <Text style={[
                    styles.transactionStatus,
                    transaction.status === 'pending' && styles.statusPending,
                  ]}>
                    {transaction.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </LinearGradient>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  safeArea: {
    height: 50,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },

  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },

  headerTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  // Total Card
  totalCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
  },

  totalLabel: {
    fontSize: typography.caption,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },

  totalAmount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.md,
  },

  totalStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    paddingTop: spacing.md,
  },

  totalStat: {
    flex: 1,
  },

  totalStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: spacing.md,
  },

  statLabel: {
    fontSize: typography.small,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: spacing.xs,
  },

  statValue: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.white,
  },

  // Pending Card
  pendingCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.pastel.lemonYellow,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  pendingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  pendingLabel: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  pendingAmount: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  pendingNote: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  // Period Filter
  periodFilter: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },

  periodButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.white,
    ...shadows.small,
  },

  periodButtonActive: {
    backgroundColor: colors.text.primary,
  },

  periodText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  periodTextActive: {
    color: colors.white,
    fontWeight: '600',
  },

  // Section
  section: {
    paddingHorizontal: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },

  transactionsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.small,
  },

  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  transactionInfo: {
    flex: 1,
  },

  transactionActivity: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },

  transactionClient: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  transactionAmountContainer: {
    alignItems: 'flex-end',
  },

  transactionAmount: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.success,
    marginBottom: 2,
  },

  transactionStatus: {
    fontSize: typography.small,
    color: colors.success,
    textTransform: 'capitalize',
  },

  statusPending: {
    color: colors.warning,
  },
});
