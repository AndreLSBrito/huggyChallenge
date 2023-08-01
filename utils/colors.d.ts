declare module './colors.js' {
  interface FillColors {
    neutral: {
      low: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
      };
      medium: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
      };
      high: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
      };
    };
    primary: {
      "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
    };
    success: {
      "0": string;
      "1": string;
      "2": string;
      "3": string;
      "4": string;
      "5": string;
    };
    danger: {
      "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
    };
  }

  interface OnNeutralColors {
    low: {
      weak: string;
      default: string;
      strong: string;
      cta: string;
      'cta-hover': string;
      success: string;
      'success-hover': string;
      danger: string;
      'danger-hover': string;
      disabled: string;
    };
    high: {
      weak: string;
      default: string;
      strong: string;
      cta: string;
      'cta-hover': string;
      success: string;
      'success-hover': string;
      danger: string;
      'danger-hover': string;
      disabled: string;
    };
  }

  interface OnColorColors {
    low: {
      weak: string;
      default: string;
      strong: string;
    };
    high: {
      weak: string;
      default: string;
      strong: string;
    };
  }

  interface TextColors {
    onNeutral: OnNeutralColors;
    onColor: OnColorColors;
  }

  interface BorderColors {
    neutral: {
      "0": string;
      "1": string;
      "2": string;
      "3": string;
      "4": string;
      "5": string;
    };
    primary: {
      "0": string;
      "1": string;
    };
  }

  interface Colors {
    fill: FillColors;
    text: TextColors;
    border: BorderColors;
  }

  const colors: Colors;
  export default colors;
}
