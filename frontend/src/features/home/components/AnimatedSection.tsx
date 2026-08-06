import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const AnimatedSection = ({ children, className, id }: AnimatedSectionProps) => {
    return (
        <motion.section
            id={id}
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            {children}
        </motion.section>
    );
};

export const AnimatedItem = ({ children, className, id }: { children: ReactNode; className?: string; id?: string }) => (
    <motion.div id={id} variants={itemVariants} className={className}>
        {children}
    </motion.div>
);
