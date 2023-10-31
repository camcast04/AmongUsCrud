import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tzcdgltqaoutbaykmntu.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Get all crewmates
export const getCrewmates = async () => {
  let { data, error } = await supabase.from('crewmates').select('*');
  if (error) throw error;
  return data;
};

// Add new crewmate
export const addCrewmate = async (crewmate) => {
  let { data, error } = await supabase.from('crewmates').insert([crewmate]);
  if (error) throw error;
  return data;
};

// Delete crewmate by id
export const deleteCrewmate = async (id) => {
  let { data, error } = await supabase.from('crewmates').delete().match({ id });
  if (error) throw error;
  return data;
};

//Update crewmate by id
export const updateCrewmate = async (id, updatedData) => {
  let { data, error } = await supabase
    .from('crewmates')
    .update(updatedData)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export default supabase;
