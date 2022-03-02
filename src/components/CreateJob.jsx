import Nav from './Nav';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  getSkills,
  postNewTask,
  getSkillsSubCat,
} from '../Utils/api-createJob';

const CreateJob = (props) => {
  // do i need to pass category list as props or can i run two useEffect in same page?

  const { categoryList } = props;
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [form, setForm] = useState({
    taskName: '',
    category: 'languages',
    subCategory: '',
    description: '',
    startTime: '',
    endTimime: '',
    location: '',
  });

  const category = form.category;

  const handleSubmit = (e) => {
    e.preventDefault();
    const postedTask = {
      task_name: form.taskName,
      booker_id: 1,
      skill_id: parseInt(form.subCategory),
      task_description: form.description,
      start_time: form.startTime,
      end_time: form.endTime,
      location: form.location,
    };
    console.log(postedTask);
    postNewTask(postedTask);
  };

  // introduce a state that changes when category selected? To then trigger useEffect?
  useEffect(() => {
    getSkillsSubCat(form.category).then((subSkillsFromApi) => {
      setSubCategoryList(subSkillsFromApi);
    });
  }, [form.category]);

  return (
    <StyledCreateJob>
      <form className='CreateJob__form' onSubmit={handleSubmit}>
        <h1>Post your job</h1>
        <input
          id='taskName'
          type='text'
          required
          placeholder='Task Name: '
          onChange={(e) => setForm({ ...form, taskName: e.target.value })}
        />
        <select
          id='category'
          required
          placeholder='Category: '
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value=''> --- Please select a category </option>
          {categoryList.map((category) => {
            return <option>{category.slug}</option>;
          })}
        </select>
        <select
          id='subcategory'
          required
          placeholder='subCategory: '
          onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
        >
          <option value=''> --- Please select a sub-category </option>
          {subCategoryList.map((category) => {
            return (
              <option value={category.skill_id}>
                {category.skill_subcategory}
              </option>
            );
          })}
        </select>

        <input
          type='text'
          required
          placeholder='Description: '
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type='datetime-local'
          placeholder='Start'
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
        />
        <input
          type='datetime-local'
          placeholder='Finish'
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
        />
        <input
          type='text'
          minLength='3'
          maxLength='3'
          required
          placeholder='Location: '
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <button className='Button' type='submit'>
          {' '}
          Post new task{' '}
        </button>
      </form>
    </StyledCreateJob>
  );
};

const StyledCreateJob = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    margin-bottom: 2rem;
  }

  form {
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5rem 7rem;
    border-radius: 1rem;
  }

  input {
    width: 25rem;
    margin-bottom: 0.7rem;
    padding: 1rem 1rem;
    border: 1px solid black;
  }

  #create {
    display: inline-block;
    margin: 0.5rem;
  }
`;

export default CreateJob;
