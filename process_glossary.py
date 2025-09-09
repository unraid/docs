#!/usr/bin/env python3
import re
import yaml
import sys

def load_glossary(glossary_file):
    """Load the glossary from YAML file."""
    with open(glossary_file, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def create_term_mappings(glossary):
    """Create mappings from term display names to glossary keys."""
    mappings = {}
    for key, entry in glossary.items():
        if 'term' in entry:
            term = entry['term']
            # Create case-insensitive mappings
            mappings[term.lower()] = (term, key)
            # Also map the term as-is for exact matches
            mappings[term] = (term, key)
    return mappings

def escape_regex(text):
    """Escape special regex characters in text."""
    return re.escape(text)

def process_text(text, mappings):
    """Process text and replace terms with %%Term|term%% format."""
    # Sort terms by length (longest first) to avoid partial matches
    sorted_terms = sorted(mappings.keys(), key=len, reverse=True)
    
    processed_text = text
    
    for term_lower in sorted_terms:
        term, key = mappings[term_lower]
        
        # Skip if term is empty or just whitespace
        if not term.strip():
            continue
            
        # Create regex pattern that matches whole words only
        # This prevents partial matches (e.g., "VM" matching "VMware")
        pattern = r'\b' + escape_regex(term) + r'\b'
        
        # Replace with the %%Term|term%% format
        replacement = f'%%{term}|{key}%%'
        
        # Use case-insensitive replacement
        processed_text = re.sub(pattern, replacement, processed_text, flags=re.IGNORECASE)
    
    return processed_text

def main():
    if len(sys.argv) != 3:
        print("Usage: python process_glossary.py <glossary.yaml> <input_file>")
        sys.exit(1)
    
    glossary_file = sys.argv[1]
    input_file = sys.argv[2]
    
    # Load glossary
    try:
        glossary = load_glossary(glossary_file)
    except Exception as e:
        print(f"Error loading glossary: {e}")
        sys.exit(1)
    
    # Create term mappings
    mappings = create_term_mappings(glossary)
    
    # Read input file
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            text = f.read()
    except Exception as e:
        print(f"Error reading input file: {e}")
        sys.exit(1)
    
    # Process the text
    processed_text = process_text(text, mappings)
    
    # Write output
    output_file = input_file.replace('.md', '_processed.md')
    try:
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(processed_text)
        print(f"Processed file saved as: {output_file}")
    except Exception as e:
        print(f"Error writing output file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 