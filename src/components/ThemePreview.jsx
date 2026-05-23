import { theme, colors, typography } from '../styles/theme'

const { borderRadius, shadows, spacing } = theme

function fontSize(role) {
  const { min, max } = typography[role].fontSize
  return `${(min + max) / 2}px`
}

function fontWeight(role) {
  const { min, max } = typography[role].fontWeight
  return (min + max) / 2
}

export function ThemePreview() {
  return (
    <div
      style={{
        minHeight: '100svh',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: colors.background,
        color: colors.textPrimary,
        fontFamily: typography.fontFamily,
        padding: spacing[6],
        textAlign: 'left',
      }}
    >
      <h1
        style={{
          fontSize: fontSize('headline'),
          fontWeight: fontWeight('headline'),
          margin: `0 0 ${spacing[4]}px`,
          color: colors.textPrimary,
        }}
      >
        WePadel
      </h1>

      <p
        style={{
          fontSize: fontSize('subheading'),
          fontWeight: fontWeight('subheading'),
          color: colors.textSecondary,
          margin: `0 0 ${spacing[6]}px`,
        }}
      >
        Vista de prueba del theme
      </p>

      <div
        style={{
          backgroundColor: colors.secondary,
          borderRadius: borderRadius.lg,
          boxShadow: shadows.md,
          padding: spacing[4],
          marginBottom: spacing[4],
        }}
      >
        <span
          style={{
            fontSize: fontSize('body'),
            fontWeight: fontWeight('body'),
          }}
        >
          Tarjeta con secondary + sombra md
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[3] }}>
        <button
          type="button"
          style={{
            backgroundColor: colors.primary,
            color: colors.textPrimary,
            border: 'none',
            borderRadius: borderRadius.md,
            padding: `${spacing[2]}px ${spacing[4]}px`,
            fontSize: fontSize('label'),
            fontWeight: fontWeight('label'),
            fontFamily: typography.fontFamily,
            boxShadow: shadows.glow,
            cursor: 'pointer',
          }}
        >
          Primary
        </button>

        <button
          type="button"
          style={{
            backgroundColor: colors.tertiary,
            color: colors.secondary,
            border: 'none',
            borderRadius: borderRadius.md,
            padding: `${spacing[2]}px ${spacing[4]}px`,
            fontSize: fontSize('label'),
            fontWeight: fontWeight('label'),
            fontFamily: typography.fontFamily,
            cursor: 'pointer',
          }}
        >
          Tertiary
        </button>
      </div>

      <p
        style={{
          marginTop: spacing[4],
          color: colors.error,
          fontSize: fontSize('label'),
          fontWeight: fontWeight('label'),
        }}
      >
        Mensaje de error de ejemplo
      </p>
    </div>
  )
}
