<script>
import Option from './Option.svelte';
import Question from './Question.svelte';
import { onMount } from "svelte";
import { apiData} from './store.js';

onMount(async () => {
  fetch("http://127.0.0.1:8000/questions/v1/?sub=english&year=2008&rand=True&exam=utme&num=20")
  .then(response => response.json())
  .then(data => {
		console.log(data);
    apiData.set(data);
  }).catch(error => {
    console.log(error);
    return [];
  });
});
</script>

<Question>
What is the answer to abcd?
</Question>
<div class="options">
<Option>
A. Option A
</Option>
<Option>
B. Option B
</Option>
<Option>
C. Option C
</Option>
<Option>
D. Option D
</Option>
</div>

<style>
.options{
display:block;
}

</style>
